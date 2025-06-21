import SimilarityScanPage from '@/components/track/SimilarityScanPage';
import { detectionResults } from '@/data/detection-results';

export async function generateStaticParams() {
  const params: { id: string; detectionId: string }[] = [];
  
  detectionResults.forEach((result) => {
    result.detections.forEach((detection, index) => {
      params.push({
        id: result.artworkId,
        detectionId: index.toString(),
      });
    });
  });
  
  return params;
}

export default function SimilarityScan({ 
  params 
}: { 
  params: { id: string; detectionId: string } 
}) {
  return <SimilarityScanPage artworkId={params.id} detectionId={params.detectionId} />;
}