"use client";

import { ArrowLeft } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({artistName: "", description: "", profile_url: ""});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();

        setFormData({
          artistName: data.artist_name ?? "",
          description: data.description ?? "",
          profile_url: data.profile_url ?? "",
        });
      } catch (err) {
        console.error("Failed to load user:", err);
        router.push("/login"); // 혹은 오류 핸들링
      }
    };

    getUser();
  }, [router]);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    // 내 정보 업데이트
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = async () => {
    try {
      await fetch("/api/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // reload
      // 수정되었습니다. 알려주기
      alert("Profile updated successfully!");

      router.refresh();
    } catch (error) {
      if (error) {
        throw new Error("Failed to update profile");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-32">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-gray-200 px-6 py-4 lg:px-12">
            <button onClick={handleBack} className="-ml-2 p-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Edit Profile
            </h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Profile Photo - Left side on desktop */}
              <div className="mb-8 text-center lg:mb-0 lg:w-80 lg:flex-shrink-0 lg:text-left">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100 lg:mx-0 lg:h-32 lg:w-32">
                  <img
                    src={formData.profile_url || "/default-profile.png"}
                    alt="Aria Solen"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-300 bg-transparent px-6 py-2 text-gray-900 hover:bg-gray-50"
                >
                  Change Photo
                </Button>
              </div>

              {/* Form - Right side on desktop */}
              <div className="lg:flex-1">
                <div className="space-y-6">
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
                      value={formData.artistName}
                      onChange={(e) =>
                        handleInputChange("artistName", e.target.value)
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
                      Artist Description
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
