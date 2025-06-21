import ProtectedArtworkDetailPage from '@/components/me/ProtectedArtworkDetailPage';
import { protectedArtworks } from '@/data/protected-artworks';

export async function generateStaticParams() {
  return protectedArtworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export default function ProtectedArtworkDetail({ params }: { params: { id: string } }) {
  return <ProtectedArtworkDetailPage artworkId={params.id} />;
}