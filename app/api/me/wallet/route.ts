import { query } from '@/lib/db';
import { AlgorandBalance, User } from '@/lib/ddl.type';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1;`,
      [token.email]
    );

    if (res.rowCount === 0) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = res.rows[0] as User;
    const wallet_address = user.algo_address;
    const network = 'Algorand';

    const walletAddress = await query(
      `SELECT * FROM algorand_balances WHERE user_id = $1;`,
      [user.id]
    );

    let balance = '990';
    const balances = walletAddress.rows[0] as AlgorandBalance | undefined;

    if (balances && balances.balance) {
      balance = balances.balance;
    }

    return NextResponse.json({
        address: wallet_address,
        network: network,
        balance: balance
    });

  } catch (error) {
    console.error("API /api/me/wallet POST error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
