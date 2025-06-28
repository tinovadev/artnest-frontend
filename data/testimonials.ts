export interface Testimonial {
  name: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Juno Ahn",
    quote: "Finally, I feel in control of how my work is used.",
    avatar:
      "https://images.unsplash.com/photo-1715037270001-63decf3748ad?q=80&w=1288&auto=format&fit=crop",
  },
  {
    name: "Elise Laurent",
    quote: "I've felt truly supported as an digital artist.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Marcus Chen",
    quote: "ArtNest gives me peace of mind about my creative work.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];
