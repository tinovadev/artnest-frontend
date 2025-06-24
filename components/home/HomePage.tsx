"use client";

import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { testimonials } from "@/data/testimonials";
import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { useRouter } from "next/navigation";
import Features from "./Features";

export default function HomePage() {
  const router = useRouter();

  const handlePlusClick = () => {
    router.push("/ai-learning-off");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <TopNavbar />

      <ScrollArea className="h-screen">
        <div className="pb-20 lg:pb-8 lg:pt-20">
          <div className="lg:hidden">
            <Header />
          </div>

          <div className="mx-auto max-w-7xl px-4 lg:px-12">
            {/* Main Content - Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Main CTA Card */}
              <div className="lg:flex-1">
                <Card className="mb-12 w-full space-y-8 overflow-hidden rounded-3xl border-0 bg-primary px-6 py-5 lg:mb-0 lg:p-12">
                  <h1 className="font-pixel text-5xl font-bold leading-[1.2] text-foreground lg:text-7xl lg:leading-[1.2]">
                    Try it
                    <br />
                    on your
                    <br />
                    art
                  </h1>
                  <p className="font-sans text-foreground opacity-90 lg:text-xl">
                    Upload your work to keep it safe
                    <br />
                    from AI training.
                    <br />
                    Only PNG files are allowed.
                  </p>

                  <div className="flex w-full justify-end">
                    <Button
                      className="group h-16 w-16 rounded-full border-0 bg-black p-0 text-foreground hover:bg-secondary lg:h-20 lg:w-20"
                      //
                      onClick={handlePlusClick}
                      size="lg"
                    >
                      <Plus
                        className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90"
                        //
                        weight="bold"
                      />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Why Artists Choose Us Section */}
              <div className="lg:my-auto lg:flex-1">
                <h2 className="mb-4 font-sans text-2xl font-bold text-foreground lg:text-3xl">
                  Why Artists Choose Us
                </h2>
                <div className="space-y-2 lg:space-y-3">
                  {testimonials.map((testimonial, index) => (
                    <Card
                      key={index}
                      className="rounded-2xl border-border bg-secondary px-6 py-5 lg:p-8"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0 lg:h-16 lg:w-16">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback className="bg-muted text-foreground">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="mb-2 font-sans text-sm font-semibold text-muted-foreground lg:text-base">
                            {testimonial.name}
                          </h3>
                          <p className="font-sans text-base leading-relaxed text-foreground lg:text-lg">
                            {testimonial.quote}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <Features />
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}
