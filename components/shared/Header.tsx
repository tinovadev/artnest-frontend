'use client';

export default function Header() {
  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-sm"></div>
          </div>
        </div>
        <span className="text-xl font-pixel font-bold tracking-wide">artnest</span>
      </div>
    </div>
  );
}