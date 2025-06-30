import ForSaleArtworkDetailPage from '@/components/me/ForSaleArtworkDetailPage';

export default function ForSaleArtworkDetail({ params }: { params: { id: string } }) {
  return <ForSaleArtworkDetailPage artworkId={params.id} />;
}