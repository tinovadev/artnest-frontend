export interface ProtectedArtworkDetails {
  artworkId: string;
  year: string;
  artist: string;
  dimensions: string;
  medium: string;
  edition: string;
  description: string;
}

export const protectedArtworkDetails: ProtectedArtworkDetails[] = [
  {
    artworkId: '1',
    year: '2025',
    artist: 'Aria Solen',
    dimensions: '90 x 120 cm',
    medium: 'Mixed media on canvas',
    edition: 'Limited edition of 5',
    description: '"Song of the Wind" evokes a sense of quiet movement and gentle chaos. This piece blends impressionistic brushstrokes with subtle motion blur, ideal for training generative models in atmospheric effects, organic movement, or texture blending.'
  },
  {
    artworkId: '2',
    year: '2025',
    artist: 'Aria Solen',
    dimensions: '80 x 100 cm',
    medium: 'Digital painting',
    edition: 'Open edition',
    description: 'An urban landscape exploring the intersection of architecture and nature, featuring bold geometric forms and organic flowing elements.'
  },
  {
    artworkId: '3',
    year: '2025',
    artist: 'Aria Solen',
    dimensions: '70 x 70 cm',
    medium: 'Acrylic on canvas',
    edition: 'Limited edition of 10',
    description: 'A study in geometric patterns and color relationships, exploring the balance between structure and spontaneity in abstract composition.'
  },
  {
    artworkId: '4',
    year: '2025',
    artist: 'Aria Solen',
    dimensions: '60 x 80 cm',
    medium: 'Mixed media',
    edition: 'Unique piece',
    description: 'An abstract portrait that captures the essence of human emotion through color and form, blending traditional and digital techniques.'
  }
];