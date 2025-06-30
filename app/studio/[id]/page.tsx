import ArtworkDetailPage from '@/components/studio/ArtworkDetailPage';
import { studioArtworks } from '@/data/studio-artworks';

export async function generateStaticParams() {
  return studioArtworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export default function ArtworkDetail({ params }: { params: { id: string } }) {
  return <ArtworkDetailPage artworkId={params.id} />;
}