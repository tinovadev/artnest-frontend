"use client";

import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ArtworkForm } from "@/lib/types/ai-learning-off";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CompletedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ArtworkForm>({
    title: "",
    artist: "Aria Solen",
    year: "",
    medium: "",
    dimensions: "",
    edition: "",
    description: "",
  });

  const [artworkData, setArtworkData] = useState<ArtworkForm | null>(null);

  const artworkUrl = searchParams?.get("artworkUrl");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/protected-artwork-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Artwork formData upload failed");
    }

    const parsedResponse = await response.json();
    setArtworkData(parsedResponse.result);

    setIsModalOpen(true);
  }

  const handleStartTracking = () => {
    setIsModalOpen(false);
    // Navigate to track page

    sessionStorage.setItem("artworkData", JSON.stringify(artworkData));
    router.push("/track");
  };

  const handleNotNow = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background p-20 text-foreground">
      <TopNavbar />

      {/* Scrollable Content */}
      <ScrollArea className="mb-9 flex-1">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-12">
          {/* Success Message */}
          <div className="mb-4">
            <h1 className="mb-1 font-pixel text-3xl font-bold text-primary lg:text-5xl">
              Completed!
            </h1>
            <p className="text-base text-muted-foreground lg:text-lg">
              Your creation is now securely protected.
            </p>
          </div>

          {/* Main Content - Responsive Layout */}
          <div className="lg:flex lg:items-start lg:gap-12">
            {/* Protected Artwork */}
            <div className="mb-4 lg:mb-0 lg:flex-shrink-0">
              <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl bg-muted lg:mx-0 lg:h-96 lg:w-80">
                {artworkUrl ? (
                  <Image
                    src={artworkUrl}
                    alt="Protected artwork"
                    className="h-full w-full object-cover"
                    fill={true}
                    priority={true}
                  />
                ) : null}
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

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="lg:flex-1">
              <Card className="space-y-6 rounded-3xl border-0 bg-white p-6 lg:p-8">
                {/* Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="A name that captures your art."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                {/* Artist */}
                <div className="space-y-2">
                  <Label
                    htmlFor="artist"
                    className="text-sm font-medium text-gray-700"
                  >
                    Artist
                  </Label>
                  <Input
                    id="artist"
                    value={formData.artist}
                    onChange={(e) =>
                      handleInputChange("artist", e.target.value)
                    }
                    className="h-12 rounded-xl border-gray-200 bg-white text-gray-900"
                  />
                </div>

                {/* Year & Medium */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="year"
                      className="text-sm font-medium text-gray-700"
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
                      className="h-12 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="medium"
                      className="text-sm font-medium text-gray-700"
                    >
                      Medium
                    </Label>
                    <Input
                      id="medium"
                      placeholder="Materials or techniques"
                      value={formData.medium}
                      onChange={(e) =>
                        handleInputChange("medium", e.target.value)
                      }
                      className="h-12 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Size & Edition */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="dimensions"
                      className="text-sm font-medium text-gray-700"
                    >
                      Dimensions
                    </Label>
                    <Input
                      id="dimensions"
                      placeholder="How big is your work?"
                      value={formData.dimensions}
                      onChange={(e) =>
                        handleInputChange("dimensions", e.target.value)
                      }
                      className="h-12 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="edition"
                      className="text-sm font-medium text-gray-700"
                    >
                      Edition
                    </Label>
                    <Input
                      id="edition"
                      placeholder="Part of an edition?"
                      value={formData.edition}
                      onChange={(e) =>
                        handleInputChange("edition", e.target.value)
                      }
                      className="h-12 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
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
                    className="min-h-[100px] resize-none rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </Card>

              <div className="pt-4 lg:flex lg:justify-end">
                <Button
                  type="submit"
                  className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-foreground hover:bg-primary/90 lg:ml-auto lg:block"
                >
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      </ScrollArea>

      {/* Tracking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="w-[calc(100svw-32px)] max-w-sm rounded-3xl border-0 bg-secondary p-8">
          {/* Modal Content */}
          <div className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Start tracking now?
            </DialogTitle>
            <p className="text-base leading-relaxed text-muted-foreground">
              We&#39;ll look out for any copycats
              <br />
              and keep you posted.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <Button
                onClick={handleStartTracking}
                className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
              >
                Let&#39;s start
              </Button>
              <Button
                onClick={handleNotNow}
                variant="outline"
                className="w-full rounded-2xl border-0 bg-black py-4 text-lg font-semibold text-white hover:bg-black/80"
              >
                Not now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
