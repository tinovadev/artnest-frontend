'use client';

export default function Header() {
  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-2 mb-8">
        <img 
          src="/artnest-logo.svg" 
          alt="ArtNest Logo" 
          className="h-8 w-auto"
        />
      </div>
    </div>
  );
}