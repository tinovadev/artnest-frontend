export interface ForSaleArtworkDetails {
  artworkId: string;
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

export const forSaleArtworkDetails: ForSaleArtworkDetails[] = [
  {
    artworkId: '1', // Song of the Wind
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
    artworkId: '2', // Urban Dreams
    year: '2025',
    artist: 'Aria Solen',
    dimensions: '100 x 80 cm',
    medium: 'Digital painting',
    edition: 'Open edition',
    description: 'An exploration of urban landscapes through digital artistry, capturing the energy and movement of city life with bold colors and dynamic compositions.',
    artistBio: {
      title: 'Visual storyteller & digital painter',
      highlights: [
        'Background: MFA in Fine Arts, Helsinki Art School',
        'Portfolio: www.ariasolen.art',
        'Previously published in Digital Muse, Lightform Gallery'
      ]
    },
    royalty: {
      pricePerUse: 0.10,
      description: 'Each training event automatically triggers a royalty payout based on the license terms.'
    },
    license: {
      permissions: [
        'Commercial training allowed',
        'Educational use permitted'
      ],
      restrictions: [
        'Resale of image not permitted'
      ]
    },
    fileDetails: {
      format: 'PNG (high-res)',
      dimensions: '3840 x 3072 px',
      size: '7.2MB',
      uploaded: 'June 8, 2025',
      version: 'v1.0'
    }
  },
  {
    artworkId: '3', // Ocean Waves
    year: '2025',
    artist: 'Aria Solen',
    dimensions: '120 x 90 cm',
    medium: 'Acrylic on canvas',
    edition: 'Limited edition of 3',
    description: 'A serene depiction of ocean waves, capturing the natural rhythm and flow of water through traditional painting techniques enhanced with digital elements.',
    artistBio: {
      title: 'Visual storyteller & digital painter',
      highlights: [
        'Background: MFA in Fine Arts, Helsinki Art School',
        'Portfolio: www.ariasolen.art',
        'Previously published in Digital Muse, Lightform Gallery'
      ]
    },
    royalty: {
      pricePerUse: 0.06,
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
      dimensions: '4608 x 3456 px',
      size: '9.1MB',
      uploaded: 'June 5, 2025',
      version: 'v1.0'
    }
  }
];