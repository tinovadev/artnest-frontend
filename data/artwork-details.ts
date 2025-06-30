export interface ArtworkDetails {
  artworkId: string;
  title: string;
  price: string;
  image: string;
  year: string;
  artist: string;
  dimensions: string;
  medium: string;
  edition: string;
  description: string;
  artistBio: {
    title: string;
    highlights: string[];
  };
  royalty: {
    pricePerUse: number;
    description: string;
  };
  license: {
    permissions: string[];
    restrictions: string[];
  };
  fileDetails: {
    format: string;
    dimensions: string;
    size: string;
    uploaded: string;
    version: string;
  };
}

export const artworkDetails: ArtworkDetails[] = [
  {
    artworkId: '2', // Song of the Wind
    title: 'string',
    price: 'string',
    image: 'string',
    year: '2025',
    artist: 'Aria Solen',
    dimensions: '90 x 120 cm',
    medium: 'Mixed media on canvas',
    edition: 'Limited edition of 5',
    description: '"Song of the Wind" evokes a sense of quiet movement and gentle chaos. This piece blends impressionistic brushstrokes with subtle motion blur, ideal for training generative models in atmospheric effects, organic movement, or texture blending.',
    artistBio: {
      title: 'Visual storyteller & digital painter',
      highlights: [
        'Background: MFA in Fine Arts, Helsinki Art School',
        'Portfolio: www.ariasolen.art',
        'Previously published in Digital Muse, Lightform Gallery'
      ]
    },
    royalty: {
      pricePerUse: 0.08,
      description: 'Each training event automatically triggers a royalty payout based on the license terms.'
    },
    license: {
      permissions: [
        'Commercial training allowed',
        'Derivative generation permitted'
      ],
      restrictions: [
        'Resale of image not permitted'
      ]
    },
    fileDetails: {
      format: 'PNG (high-res)',
      dimensions: '4096 x 2731 px',
      size: '8.4MB',
      uploaded: 'June 10, 2025',
      version: 'v1.0'
    }
  },
  {
    artworkId: '1', // Memories of Su...
    year: '2025',
    title: 'string',
    price: 'string',
    image: 'string',
    artist: 'Digital Artist',
    dimensions: '80 x 80 cm',
    medium: 'Digital painting',
    edition: 'Open edition',
    description: 'An abstract exploration of memory and time, featuring vibrant color blocks that represent fragments of recollection.',
    artistBio: {
      title: 'Contemporary digital artist',
      highlights: [
        'Specializes in abstract digital compositions',
        'Featured in multiple online galleries',
        'Focus on emotional expression through color'
      ]
    },
    royalty: {
      pricePerUse: 0.05,
      description: 'Standard royalty rate for digital training usage.'
    },
    license: {
      permissions: [
        'Commercial training allowed',
        'Educational use permitted'
      ],
      restrictions: [
        'No direct resale allowed'
      ]
    },
    fileDetails: {
      format: 'PNG (high-res)',
      dimensions: '3200 x 3200 px',
      size: '6.2MB',
      uploaded: 'May 15, 2025',
      version: 'v1.0'
    }
  }
];