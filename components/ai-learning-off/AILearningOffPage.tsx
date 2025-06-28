"use client";

import { ArrowLeft, Stamp, GridFour, Eye, Crown, CloudArrowUp, X } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopNavbar from "@/components/shared/TopNavbar";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";

interface ProtectionOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  selected?: boolean;
}

const protectionOptions: ProtectionOption[] = [
  {
    id: "watermark",
    icon: <Stamp size={24} className="text-primary" />,
    title: "Embed Invisible Watermark",
    description:
      "Embed a hidden, tamper-resistant watermark into your image to help prove ownership and trace unauthorized use.",
    price: "Free",
  },
  {
    id: "noise",
    icon: <GridFour size={24} className="text-primary" />,
    title: "Add Adversarial Noise",
    description:
      "Applies subtle pixel-level noise to prevent your artwork from being effectively used in AI training, without affecting human viewers.",
    price: "$5",
  },
  {
    id: "full-protection",
    icon: <Crown size={24} className="text-primary" />,
    title: "Full protection",
    description:
      "Scans the web and AI-generated datasets for visually similar images to detect possible unauthorized use or training.",
    price: "$4",
    selected: true,
  },
];

export default function AILearningOffPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("full-protection");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    router.back();
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (!uploadedImage) {
      setUploadError("Please upload an image before proceeding.");
      return;
    }
    // Navigate to processing page
    router.push("/processing");
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (file.type !== "image/png") {
      setUploadError("Only PNG files are allowed.");
      return false;
    }

    // Check file size (optional - e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError("File size must be less than 10MB.");
      return false;
    }

    setUploadError(null);
    return true;
  };

  const handleFileUpload = useCallback((file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
          {/* Main Content - Responsive Layout */}
          <div className="lg:flex lg:items-start lg:gap-12">
            {/* Artwork Preview/Upload */}
            <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
              <div className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0 lg:h-96 lg:w-96">
                {uploadedImage ? (
                  // Uploaded Image Display
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={uploadedImage}
                      alt="Uploaded artwork"
                      className="h-full w-full object-cover"
                    />
                    {/* Grid overlay to simulate protection visualization */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
                      <div className="absolute inset-0 opacity-20">
                        <div className="grid-rows-8 grid h-full w-full grid-cols-8">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className="border border-white/10" />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={handleRemoveImage}
                      className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  // Upload Area
                  <div
                    className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 ${
                      isDragOver
                        ? "border-primary bg-primary/10"
                        : "border-border bg-muted hover:border-primary hover:bg-primary/5"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                  >
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                      <div className="rounded-full bg-primary/20 p-4">
                        <CloudArrowUp
                          size={32}
                          className="text-primary lg:h-10 lg:w-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          Upload your artwork
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your PNG file here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG files only • Max 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,image/png"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {/* Upload Error */}
              {uploadError && (
                <div className="mt-3 rounded-xl bg-red-500/20 p-3 text-center">
                  <p className="text-sm text-red-400">{uploadError}</p>
                </div>
              )}
            </div>

            {/* Settings Section */}
            <div className="lg:flex-1">
              <h2 className="mb-4 text-xl font-semibold lg:text-2xl">
                Customize your
                <br />
                AI Learning Off settings
              </h2>

              <div className="space-y-4">
                {protectionOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer rounded-2xl px-6 py-5 transition-all duration-200 ${
                      selectedOption === option.id
                        ? "border-2 border-primary bg-primary/20"
                        : "border-2 bg-secondary hover:border-primary"
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="mt-1 flex-shrink-0 rounded-full bg-primary/20 p-1">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {option.title}
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                          {option.description}
                        </p>
                        <div className="text-lg font-bold text-foreground">
                          {option.price}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

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
    </div>
  );
}