"use client";

import { ArrowLeft, Stamp, GridFour, Eye, Crown } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopNavbar from "@/components/shared/TopNavbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const handleBack = () => {
    router.back();
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    // Navigate to processing page
    router.push("/processing");
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
            {/* Artwork Preview */}
            <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-muted lg:mx-0 lg:h-96 lg:w-96">
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"
                  alt="Artwork preview"
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
              </div>
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
