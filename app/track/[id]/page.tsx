import ArtworkDetailPage from '@/components/track/ArtworkDetailPage';

export default function ArtworkDetail({ params }: { params: { id: string } }) {
  return <ArtworkDetailPage artworkId={params.id} />;
}