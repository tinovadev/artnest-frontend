"use client";

import { ArrowLeft } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import TopNavbar from "@/components/shared/TopNavbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompletedPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "Aria Solen",
    year: "",
    medium: "",
    size: "",
    edition: "",
    description: "",
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
    setIsModalOpen(true);
  };

  const handleStartTracking = () => {
    setIsModalOpen(false);
    // Navigate to track page
    router.push("/track");
  };

  const handleNotNow = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNavbar />

      {/* Header */}
      <div className="mx-auto flex w-full max-w-7xl flex-shrink-0 items-center gap-4 border-b border-border px-6 py-4 lg:mt-20 lg:px-12">
        <button onClick={handleBack} className="-ml-2 p-2">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold">AI Learning Off</h1>
      </div>

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
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop"
                  alt="Protected artwork"
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

            {/* Form Section */}
            <div className="lg:flex-1">
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

                {/* Year and Medium - Grid Layout */}
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

                {/* Size and Edition - Grid Layout */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="size"
                      className="text-sm font-medium text-gray-700"
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
                  onClick={handleConfirm}
                  className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-foreground hover:bg-primary/90 lg:ml-auto lg:block"
                >
                  Confirm
                </Button>
              </div>
            </div>
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
              We'll look out for any copycats
              <br />
              and keep you posted.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <Button
                onClick={handleStartTracking}
                className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
              >
                Let's start
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
