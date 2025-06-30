import ForSaleArtworkEditPage from '@/components/me/ForSaleArtworkEditPage';
import { forSaleArtworks } from '@/data/for-sale-artworks';

// export async function generateStaticParams() {
//   return forSaleArtworks.map((artwork) => ({
//     id: artwork.id,
//   }));
// }

export default function ForSaleArtworkEdit({ params }: { params: { id: string } }) {
  return <ForSaleArtworkEditPage artworkId={params.id} />;
}