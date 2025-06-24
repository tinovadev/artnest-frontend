"use client";

import { ArrowLeft } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { protectedArtworks } from "@/data/protected-artworks";
import { protectedArtworkDetails } from "@/data/protected-artwork-details";

interface ProtectedArtworkEditPageProps {
  artworkId: string;
}

export default function ProtectedArtworkEditPage({
  artworkId,
}: ProtectedArtworkEditPageProps) {
  const router = useRouter();
  const artwork = protectedArtworks.find((art) => art.id === artworkId);
  const details = protectedArtworkDetails.find(
    (detail) => detail.artworkId === artworkId,
  );

  const [formData, setFormData] = useState({
    title: artwork?.title || "",
    artist: details?.artist || "Aria Solen",
    year: details?.year || "",
    medium: details?.medium || "",
    size: details?.dimensions || "",
    edition: details?.edition || "",
    description: details?.description || "",
  });

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    // Handle form submission - update artwork details
    console.log("Updated artwork details:", formData);

    // Navigate back to detail page
    router.push(`/me/protected/${artworkId}`);
  };

  if (!artwork) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-32">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-gray-200 px-6 py-4 lg:mt-20 lg:px-12">
            <button onClick={handleBack} className="-ml-2 p-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="truncate text-lg font-semibold text-gray-900">
              {artwork.title}
            </h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Artwork Image - Left Side on Desktop */}
              <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-gray-100 lg:mx-0 lg:h-[480px] lg:w-96">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Grid overlay to show protection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid-rows-10 grid h-full w-full grid-cols-8">
                        {Array.from({ length: 80 }).map((_, i) => (
                          <div key={i} className="border border-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form - Right Side on Desktop */}
              <div className="lg:flex-1">
                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-base font-medium text-gray-900"
                    >
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="A name that captures your art."
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Artist */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="artist"
                      className="text-base font-medium text-gray-900"
                    >
                      Artist
                    </Label>
                    <Input
                      id="artist"
                      value={formData.artist}
                      onChange={(e) =>
                        handleInputChange("artist", e.target.value)
                      }
                      className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900"
                    />
                  </div>

                  {/* Year and Medium - Grid Layout */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="year"
                        className="text-base font-medium text-gray-900"
                      >
                        Year
                      </Label>
                      <Input
                        id="year"
                        placeholder="When did you make this?"
                        value={formData.year}
                        onChange={(e) =>
                          handleInputChange("year", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="medium"
                        className="text-base font-medium text-gray-900"
                      >
                        Medium
                      </Label>
                      <Input
                        id="medium"
                        placeholder="What materials or techniques did you use?"
                        value={formData.medium}
                        onChange={(e) =>
                          handleInputChange("medium", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Size and Edition - Grid Layout */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="size"
                        className="text-base font-medium text-gray-900"
                      >
                        Size
                      </Label>
                      <Input
                        id="size"
                        placeholder="How big is your work?"
                        value={formData.size}
                        onChange={(e) =>
                          handleInputChange("size", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="edition"
                        className="text-base font-medium text-gray-900"
                      >
                        Edition
                      </Label>
                      <Input
                        id="edition"
                        placeholder="Is this part of an edition?"
                        value={formData.edition}
                        onChange={(e) =>
                          handleInputChange("edition", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-base font-medium text-gray-900"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Add a short description."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="min-h-[120px] resize-none rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex lg:justify-end lg:pt-6">
              <Button
                onClick={handleConfirm}
                className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90 lg:w-auto lg:min-w-[200px]"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
