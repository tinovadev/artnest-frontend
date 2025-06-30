"use client";

import { ArrowLeft } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { forSaleArtworks } from "@/data/for-sale-artworks";
import { forSaleArtworkDetails } from "@/data/for-sale-artwork-details";
import { ArtworkDetails } from "@/data/artwork-details";

interface ForSaleArtworkEditPageProps {
  artworkId: string;
}

export default function ForSaleArtworkEditPage({
  artworkId,
}: ForSaleArtworkEditPageProps) {
  const router = useRouter();
  const artwork = forSaleArtworks.find((art) => art.id === artworkId);
  const details = forSaleArtworkDetails.find(
    (detail) => detail.artworkId === artworkId,
  );

  const [formData, setFormData] = useState({
    title: artwork?.title || "",
    price: artwork?.price || 10,
    year: details?.year || "",
    artist: details?.artist || "Aria Solen",
    dimensions: details?.dimensions || "",
    medium: details?.medium || "",
    edition: details?.edition || "",
    description: details?.description || "",
    artistBio: details?.artistBio.title || "",
    royaltyPerUse: details?.royalty.pricePerUse || 0.08,
    permissions: {
      commercialTraining:
        details?.license.permissions.includes("Commercial training allowed") ||
        false,
      resaleNotPermitted:
        details?.license.restrictions.includes(
          "Resale of image not permitted",
        ) || false,
      derivativeGeneration:
        details?.license.permissions.includes(
          "Derivative generation permitted",
        ) || false,
    },
  });
  useEffect(() => {
    const generateStaticParams = async () => {
    const data = await fetch("/api/artwork-details?artworkId=" + artworkId);
      if (!data.ok) {
        console.error("Failed to fetch for sale artworks");
        return;
      }
      const forSaleArtworksData = await data.json() as ArtworkDetails;
      if (forSaleArtworksData == null) {
        console.error("No for sale artworks found");
        return;
      }

      console.log("For Sale Artwork Data:", forSaleArtworksData);

      if (artwork && details) {
        setFormData({
          title: forSaleArtworksData.title,
          price: Number(forSaleArtworksData.price),
          year: forSaleArtworksData.year || "",
          artist: forSaleArtworksData.artist || "Aria Solen",
          dimensions: forSaleArtworksData.dimensions || "",
          medium: forSaleArtworksData.medium || "",
          edition: forSaleArtworksData.edition || "",
          description: forSaleArtworksData.description || "",
          artistBio: forSaleArtworksData.artistBio.title || "",
          royaltyPerUse: forSaleArtworksData.royalty.pricePerUse || 0.08,
          permissions: {
            commercialTraining:
              forSaleArtworksData.license.permissions.includes("Commercial training allowed") ||
              false,
            resaleNotPermitted:
              forSaleArtworksData.license.restrictions.includes("Resale of image not permitted") ||
              false,
            derivativeGeneration:
              forSaleArtworksData.license.permissions.includes("Derivative generation permitted") ||
              false,
          },
        });
      }
    };

    generateStaticParams();
  }, [artwork, details]);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked,
      },
    }));
  };

  const handleConfirm = () => {
    // Handle form submission - update artwork details
    console.log("Updated for sale artwork details:", formData);

    // Navigate back to detail page
    router.push(`/me/for-sale/${artworkId}`);
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
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-base font-medium text-gray-900"
                    >
                      Price
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 transform text-base text-gray-900">
                        $
                      </span>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange(
                            "price",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white pl-8 text-base text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Year and Artist - Grid Layout */}
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
                        value={formData.year}
                        onChange={(e) =>
                          handleInputChange("year", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900"
                      />
                    </div>

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
                  </div>

                  {/* Dimensions and Medium - Grid Layout */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="dimensions"
                        className="text-base font-medium text-gray-900"
                      >
                        Dimensions
                      </Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) =>
                          handleInputChange("dimensions", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900"
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
                        value={formData.medium}
                        onChange={(e) =>
                          handleInputChange("medium", e.target.value)
                        }
                        className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Edition */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="edition"
                      className="text-base font-medium text-gray-900"
                    >
                      Edition
                    </Label>
                    <Input
                      id="edition"
                      value={formData.edition}
                      onChange={(e) =>
                        handleInputChange("edition", e.target.value)
                      }
                      className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900"
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
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="min-h-[120px] resize-none rounded-xl border-gray-300 bg-white text-base text-gray-900"
                    />
                  </div>

                  {/* About the Artist */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="artistBio"
                      className="text-base font-medium text-gray-900"
                    >
                      About the Artist
                    </Label>
                    <Textarea
                      id="artistBio"
                      value={formData.artistBio}
                      onChange={(e) =>
                        handleInputChange("artistBio", e.target.value)
                      }
                      className="min-h-[80px] resize-none rounded-xl border-gray-300 bg-white text-base text-gray-900"
                    />
                  </div>

                  {/* Royalty per Use */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="royaltyPerUse"
                      className="text-base font-medium text-gray-900"
                    >
                      Royalty per Use
                    </Label>
                    <Input
                      id="royaltyPerUse"
                      placeholder="How much royalty would you like to earn?"
                      value={formData.royaltyPerUse}
                      onChange={(e) =>
                        handleInputChange(
                          "royaltyPerUse",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="h-14 rounded-xl border-gray-300 bg-white text-base text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* AI Usage License */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium text-gray-900">
                      AI Usage License
                    </Label>

                    <div className="space-y-4 rounded-xl border border-gray-300 p-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="commercialTraining"
                          checked={formData.permissions.commercialTraining}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(
                              "commercialTraining",
                              checked as boolean,
                            )
                          }
                          className="border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                        />
                        <Label
                          htmlFor="commercialTraining"
                          className="cursor-pointer text-base text-gray-900"
                        >
                          Commercial training allowed
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="resaleNotPermitted"
                          checked={formData.permissions.resaleNotPermitted}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(
                              "resaleNotPermitted",
                              checked as boolean,
                            )
                          }
                          className="border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                        />
                        <Label
                          htmlFor="resaleNotPermitted"
                          className="cursor-pointer text-base text-gray-900"
                        >
                          Resale of image not permitted
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="derivativeGeneration"
                          checked={formData.permissions.derivativeGeneration}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(
                              "derivativeGeneration",
                              checked as boolean,
                            )
                          }
                          className="border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                        />
                        <Label
                          htmlFor="derivativeGeneration"
                          className="cursor-pointer text-base text-gray-900"
                        >
                          Derivative generation permitted
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 lg:flex lg:justify-end lg:pt-6">
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
