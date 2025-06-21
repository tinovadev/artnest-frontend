import ArtworkDetailPage from '@/components/track/ArtworkDetailPage';
import { trackingArtworks } from '@/data/tracking';

export async function generateStaticParams() {
  return trackingArtworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export default function ArtworkDetail({ params }: { params: { id: string } }) {
  return <ArtworkDetailPage artworkId={params.id} />;
}