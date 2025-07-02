"use client";

import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export default function ArtistVerificationPage() {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    artistName: "",
    description: "",
    portfolioLink: "",
    file: null as File | null,
  });

  useEffect(() => {
    // Check if the user is already verified
    const getUserInfo = async () => {
      const me = await fetch("/api/me");
      if (me.ok) {
        const data = await me.json();
        if (data.artist_verified) {
          // If already verified, redirect to Me page
          router.push("/me");
        } else {
          // If not verified, set initial form data
          setFormData((prev) => ({
            ...prev,
            fullName: data.fullname || "",
            artistName: data.artist_name || "",
            description: data.description || "",
            portfolioLink: data.portfolio_link || "",
          }));
        }
      } else {
        throw new Error("Failed to fetch user info");
      }
    };

    getUserInfo();
  }, []);


  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleSubmit = async () => {
    // Handle form submission
    console.log("Form submitted:", formData);
    try {
      await fetch("/api/me/artist-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          artistName: formData.artistName,
          description: formData.description,
          portfolioLink: formData.portfolioLink,
          file: formData.file ? formData.file.name : null,
        }),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // Show success modal
    setIsSuccessModalOpen(true);
  };

  const handleConfirm = () => {
    setIsSuccessModalOpen(false);

    // Set artist verification status
    localStorage.setItem("artistVerified", "true");

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("artistVerified"));

    // Navigate back to Me page
    router.push("/me");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-8">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-gray-200 px-6 py-4 lg:px-12">
            <button onClick={handleBack} className="-ml-2 p-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Artist Verification
            </h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Main Heading - Left side on desktop */}
              <div className="mb-8 lg:mb-0 lg:w-96 lg:flex-shrink-0">
                <h2 className="mb-2 font-pixel text-3xl font-bold leading-tight text-primary lg:text-4xl">
                  Tell us about
                  <br />
                  yourself
                </h2>
              </div>

              {/* Form - Right side on desktop */}
              <div className="lg:flex-1">
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-base font-medium text-gray-900"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Required"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Artist Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="artistName"
                      className="text-base font-medium text-gray-900"
                    >
                      Artist Name
                    </Label>
                    <Input
                      id="artistName"
                      placeholder="Optional"
                      value={formData.artistName}
                      onChange={(e) =>
                        handleInputChange("artistName", e.target.value)
                      }
                      className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                    />
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
                      placeholder="Tell us a little about yourself"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="min-h-[120px] resize-none rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Portfolio Section */}
                  <div className="pt-4">
                    <h3 className="mb-6 font-pixel text-2xl font-bold text-primary lg:text-3xl">
                      Portfolio
                    </h3>

                    {/* Portfolio Link */}
                    <div className="mb-6 space-y-2">
                      <Label
                        htmlFor="portfolioLink"
                        className="text-base font-medium text-gray-900"
                      >
                        Link
                      </Label>
                      <Input
                        id="portfolioLink"
                        placeholder="Add any link that best represents your work"
                        value={formData.portfolioLink}
                        onChange={(e) =>
                          handleInputChange("portfolioLink", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    {/* File Upload */}
                    <div className="mb-8 space-y-2">
                      <Label
                        htmlFor="file"
                        className="text-base font-medium text-gray-900"
                      >
                        File
                      </Label>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <Input
                            readOnly
                            placeholder="Upload files up to 200MB"
                            value={formData.file ? formData.file.name : ""}
                            className="h-14 rounded-xl border-gray-300 bg-gray-50 text-base text-gray-900 placeholder:text-gray-400"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            id="file"
                            onChange={handleFileUpload}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            accept="image/*,application/pdf,.doc,.docx"
                          />
                          <Button
                            type="button"
                            className="h-14 whitespace-nowrap rounded-xl bg-gray-900 px-6 py-4 text-base font-semibold text-white hover:bg-gray-800"
                          >
                            Upload file
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSubmit}
                      className="h-14 w-full rounded-xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="w-[calc(100svw-32px)] max-w-sm rounded-3xl border-0 bg-white p-8">
          <div className="space-y-6 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle size={32} className="text-primary" />
            </div>

            <DialogTitle className="text-xl font-bold text-gray-900">
              Application Submitted!
            </DialogTitle>

            <p className="text-base leading-relaxed text-gray-600">
              Thank you for applying.
              <br />
              We&#39;ll review your application and
              <br />
              get back to you within a few days.
            </p>

            <Button
              onClick={handleConfirm}
              className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary/90"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
