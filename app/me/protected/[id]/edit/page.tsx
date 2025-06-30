import ProtectedArtworkEditPage from '@/components/me/ProtectedArtworkEditPage';
import { protectedArtworks } from '@/data/protected-artworks';

export async function generateStaticParams() {
  return protectedArtworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export default function ProtectedArtworkEdit({ params }: { params: { id: string } }) {
  return <ProtectedArtworkEditPage artworkId={params.id} />;
}