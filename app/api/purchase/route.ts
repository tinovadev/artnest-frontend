import { query } from '@/lib/db';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { BigNumber } from 'bignumber.js';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const {items, myInfo, total} = await req.json() as {
        items: {
            id: string;
            title: string;
            price: number;
            image: string;
            artist: string;
        }[];
        myInfo: { address: string; network: string; balance: string };
        total: string;
    };
    // NOTE: Validate 
    if (!items || !myInfo || !total) {
        return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
    const {address, network, balance} = myInfo;
    if (!address || !network || !balance) {
        return NextResponse.json({ error: 'Wallet information is required' }, { status: 400 });
    }
    // NOTE: 구매자 정보를 가져옴
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });  
    if (!token?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const me = await query(
        `SELECT * FROM users WHERE email = $1 LIMIT 1;`,
        [token.email]
    );

    const meId = me.rows[0]?.id;
    const insertPurchase = async (item: { id: string; title: string; price: number; image: string; artist: string }, buyerId: string, network: string) => {
        const licenseQuery = await query(`SELECT id FROM artwork_license WHERE artwork_id = $1 LIMIT 1;`, [item.id]);
        
        if (licenseQuery.rowCount === 0) {
            throw new Error('License not found for the artwork');
        }
        
        const result = await query(`
            INSERT INTO purchases (
                artwork_id, 
                license_id, 
                buyer_id, 
                payment_method, 
                price, 
                purchased_at
            ) VALUES
                ($1, $2, $3, $4, $5, NOW())
            RETURNING *;
            `, [
                item.id,
                licenseQuery.rows[0].id,
                buyerId,
                network,
                item.price,
        ]);
        if (result.rowCount === 0) {
            throw new Error('Failed to insert purchase');
        }
    }

    const buyerAlgobalance = await query(`SELECT * FROM algorand_balances WHERE user_id = $1 LIMIT 1;`, [meId]);
    if (buyerAlgobalance.rowCount === 0) {
        return NextResponse.json({ error: 'Buyer Algorand balance not found' }, { status: 400 });
    }
    const buyerBalance = new BigNumber(buyerAlgobalance.rows[0].balance);
    const totalPrice = new BigNumber(total);
    if (buyerBalance.isLessThan(totalPrice)) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    items.map(async item => {
        // TOOD: 트렌젝션 묶어야함
        const sellerArtkwork = await query(`SELECT * FROM artworks WHERE id = $1 LIMIT 1;`, [item.id]);
        if (sellerArtkwork.rowCount === 0) {
            return NextResponse.json({ error: 'Artwork not found' }, { status: 400 });
        }
        const sellerId = sellerArtkwork.rows[0].user_id;
        // TOOD: totla 연산은 api 에서 하는게 좋음 + 플랫폼 수수료 추가 해야함
        const sellerAlgobalance = await query(`SELECT * FROM algorand_balances WHERE user_id = $1 LIMIT 1;`, [sellerId]);
        if (sellerAlgobalance.rowCount === 0) {
            return NextResponse.json({ error: 'Seller Algorand balance not found' }, { status: 400 });
        }
        const sellerBalance = new BigNumber(sellerAlgobalance.rows[0].balance);

        const buyerAlgobalance = await query(`SELECT * FROM algorand_balances WHERE user_id = $1 LIMIT 1;`, [meId]);
        if (buyerAlgobalance.rowCount === 0) {
            return NextResponse.json({ error: 'Buyer Algorand balance not found' }, { status: 400 });
        }
        const buyerBalance = new BigNumber(buyerAlgobalance.rows[0].balance);


        const productPrice = new BigNumber(item.price);
        const resultBuyerBalance = buyerBalance.minus(productPrice).toString();
        const resultSellerBalance = sellerBalance.plus(productPrice).toString();

        await query(`UPDATE algorand_balances SET balance = $1 WHERE id = $2;`, [resultBuyerBalance, sellerId]); // 판매자
        await query('UPDATE algorand_balances SET balance = $1 WHERE id = $2;', [resultSellerBalance, meId]); // 구매자 

        await insertPurchase(item, meId, network);
    });

    return NextResponse.json({ message: 'Purchase successful' }, { status: 200 });
}
