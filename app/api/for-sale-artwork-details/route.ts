import { forSaleArtworkDetails } from '@/data/for-sale-artwork-details';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const artwork = forSaleArtworkDetails;
    console.log('artwork', artwork)

    return res.status(200).json(artwork);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
  return;
}
