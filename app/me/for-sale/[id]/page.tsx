import ForSaleArtworkDetailPage from '@/components/me/ForSaleArtworkDetailPage';
import { forSaleArtworks } from '@/data/for-sale-artworks';

export async function generateStaticParams() {
  return forSaleArtworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export default function ForSaleArtworkDetail({ params }: { params: { id: string } }) {
  return <ForSaleArtworkDetailPage artworkId={params.id} />;
}