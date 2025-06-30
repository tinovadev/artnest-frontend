import ProtectedArtworkDetailPage from '@/components/me/ProtectedArtworkDetailPage';

export default function ProtectedArtworkDetail({ params }: { params: { id: string } }) {
  return <ProtectedArtworkDetailPage artworkId={params.id} />;
}