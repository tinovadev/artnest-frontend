"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleSubmit = () => {
    return router.push("/");
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2">
        <img
          onClick={handleSubmit}
          src="/artnest-logo.svg"
          alt="ArtNest Logo"
          className="h-8 w-auto mouse-hover"
        />
      </div>
    </div>
  );
}
