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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavbar />

      {/* Header */}
      <div className="flex items-center gap-4 px-6 lg:px-12 py-4 border-b border-border flex-shrink-0 max-w-7xl mx-auto w-full lg:mt-20">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold">AI Learning Off</h1>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-6 lg:px-12 py-6 max-w-7xl mx-auto">
          {/* Main Content - Responsive Layout */}
          <div className="lg:flex lg:gap-12 lg:items-start">
            {/* Artwork Preview */}
            <div className="lg:flex-shrink-0 mb-8 lg:mb-0">
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square w-full max-w-sm lg:w-96 lg:h-96 mx-auto lg:mx-0">
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"
                  alt="Artwork preview"
                  className="w-full h-full object-cover"
                />
                {/* Grid overlay to simulate protection visualization */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-white/10" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="lg:flex-1 lg:max-w-2xl">
              <h2 className="text-xl lg:text-2xl font-semibold mb-4">
                Customize your
                <br />
                AI Learning Off settings
              </h2>

              <div className="space-y-4">
                {protectionOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`px-6 py-5 cursor-pointer transition-all duration-200 rounded-2xl  ${
                      selectedOption === option.id
                        ? "bg-primary/20 border-primary border-2"
                        : "bg-secondary hover:border-primary border-2"
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex items-start gap-4 flex-col">
                      <div className="flex-shrink-0 mt-1 p-1 bg-primary/20 rounded-full">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
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
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Confirm Button */}
      <div className="flex-shrink-0 p-6 lg:p-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={handleConfirm}
            className="w-full lg:max-w-md lg:ml-auto lg:block bg-primary hover:bg-primary/90 text-foreground font-semibold py-4 rounded-2xl text-lg"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
