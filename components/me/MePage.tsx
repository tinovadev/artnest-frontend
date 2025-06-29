"use client";

import {
  DotsThree,
  ArrowUpRight,
  PencilSimple,
  Plus,
  SignOut,
} from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { protectedArtworks } from "@/data/protected-artworks";
import { forSaleArtworks } from "@/data/for-sale-artworks";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

type TabType = "protected" | "for-sale";

export default function MePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("protected");
  const [isVerifiedArtist, setIsVerifiedArtist] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    artistName: "",
    description: "",
    portfolioLink: "",
    algo_address: "",
  });

    useEffect(() => {
    // Check if the user is already verified
    const getUserInfo = async () => {
      const me = await fetch("/api/me");
      if (me.ok) {
        const data = await me.json();
        setUserInfo(() => ({
          ...data,
          fullName: data.fullname || "",
          artistName: data.artist_name || "",
          description: data.description || "",
          portfolioLink: data.portfolio_link || "",
          algo_address: data.algo_address || "",
        }));
      } else {
        throw new Error("Failed to fetch user info");
      }
    };

    getUserInfo();
  }, []);


  // Check verification status on component mount
  useEffect(() => {
    const verificationStatus = localStorage.getItem("artistVerified");
    setIsVerifiedArtist(verificationStatus === "true");
  }, []);

  // Listen for verification status changes
  useEffect(() => {
    const handleStorageChange = () => {
      const verificationStatus = localStorage.getItem("artistVerified");
      setIsVerifiedArtist(verificationStatus === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom event for same-tab updates
    window.addEventListener("artistVerified", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("artistVerified", handleStorageChange);
    };
  }, []);

  const handleApplyArtist = () => {
    router.push("/artist-verification");
  };

  const handleWalletClick = async () => {
    await navigator.clipboard.writeText(userInfo.algo_address);
    alert(`Wallet address copied: ${userInfo.algo_address}`);
    window.open(
      'https://dispenser.testnet.aws.algodev.network/',
      '_blank'
    );
  };

  const handleArtistBadgeClick = () => {
    // Reset verification status
    localStorage.removeItem("artistVerified");
    setIsVerifiedArtist(false);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("artistVerified"));
  };

  const handleProtectedArtworkClick = (artworkId: string) => {
    router.push(`/me/protected/${artworkId}`);
  };

  const handleForSaleArtworkClick = (artworkId: string) => {
    router.push(`/me/for-sale/${artworkId}`);
  };

  const handleEditProfile = () => {
    router.push("/me/edit-profile");
  };

  const handleUpload = () => {
    router.push("/ai-learning-off");
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem("artistVerified");

    // Navigate to login page
    router.push("/login");
  };

  if (!isVerifiedArtist) {
    // Initial state - not verified artist
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TopNavbar />

        <ScrollArea className="mb-9 h-screen">
          <div className="pb-20 lg:pb-8 lg:pt-20">
            {/* Header */}
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
              <h1 className="font-pixel text-2xl font-bold text-foreground lg:text-3xl">
                Me
              </h1>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-lg p-2 transition-colors hover:bg-muted">
                    <DotsThree size={24} className="text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] rounded-xl border-border bg-secondary p-2"
                >
                  <DropdownMenuItem
                    onClick={handleEditProfile}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                  >
                    <PencilSimple size={16} className="text-muted-foreground" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleUpload}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                  >
                    <Plus size={16} className="text-muted-foreground" />
                    Upload
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-border" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                  >
                    <SignOut size={16} className="text-muted-foreground" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              {/* Responsive Layout */}
              <div className="lg:flex lg:items-start lg:gap-12">
                {/* Profile Card - Left side on desktop */}
                <div className="mb-8 lg:mb-0 lg:w-96 lg:flex-shrink-0">
                  <Card className="rounded-3xl border-border bg-secondary p-8">
                    <div className="space-y-6">
                      {/* Artist Name */}
                      <h2 className="font-pixel text-3xl font-bold text-foreground lg:text-4xl">
                        {userInfo.artistName || userInfo.fullName || "Your Name"}
                      </h2>

                      {/* NFT Wallet Link */}
                      <button
                        onClick={handleWalletClick}
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="text-base lg:text-lg">
                          My NFT Wallet
                        </span>
                        <ArrowUpRight size={20} />
                      </button>

                      {/* Apply Artist Button */}
                      <div className="flex justify-center">
                        <Button
                          onClick={handleApplyArtist}
                          className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
                        >
                          Apply Artist
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Content Area - Right side on desktop */}
                <div className="lg:flex-1">
                  {/* Tab Navigation */}
                  <div className="mb-6 flex">
                    <button
                      onClick={() => setActiveTab("protected")}
                      className={`rounded-2xl px-6 py-3 text-base font-semibold transition-colors ${
                        activeTab === "protected"
                          ? "bg-primary text-white"
                          : "border border-border bg-transparent text-muted-foreground"
                      }`}
                    >
                      Protected
                    </button>
                    <button
                      onClick={() => setActiveTab("for-sale")}
                      className={`ml-4 rounded-2xl px-6 py-3 text-base font-semibold transition-colors ${
                        activeTab === "for-sale"
                          ? "bg-primary text-white"
                          : "border border-border bg-transparent text-muted-foreground"
                      }`}
                    >
                      For Sale
                    </button>
                  </div>

                  {/* Single Artwork - Initial State */}
                  {activeTab === "protected" && (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                      <Card
                        className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-secondary transition-transform duration-200 hover:scale-[1.02]"
                        onClick={() => handleProtectedArtworkClick("1")}
                      >
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <img
                            alt={protectedArtworks[0].title}
                            src={protectedArtworks[0].image}
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                      </Card>
                    </div>
                  )}

                  {activeTab === "for-sale" && (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="text-center">
                        <h3 className="mb-2 text-xl font-semibold text-foreground">
                          No artworks for sale
                        </h3>
                        <p className="text-muted-foreground">
                          Your artworks available for purchase will appear here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <Navbar />
      </div>
    );
  }

  // Verified artist state
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />

      <ScrollArea className="h-screen">
        <div className="pb-20 lg:pb-8 lg:pt-20">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
            <h1 className="font-pixel text-2xl font-bold text-foreground lg:text-3xl">
              Me
            </h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-lg p-2 transition-colors hover:bg-muted">
                  <DotsThree size={24} className="text-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[160px] rounded-xl border-border bg-secondary p-2"
              >
                <DropdownMenuItem
                  onClick={handleEditProfile}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                >
                  <PencilSimple size={16} className="text-muted-foreground" />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleUpload}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                >
                  <Plus size={16} className="text-muted-foreground" />
                  Upload
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 bg-border" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                >
                  <SignOut size={16} className="text-muted-foreground" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Profile Card - Left side on desktop */}
              <div className="mb-8 lg:mb-0 lg:w-96 lg:flex-shrink-0">
                <Card className="relative rounded-3xl border-border bg-secondary p-8">
                  <div className="space-y-6">
                    {/* Artist Badge - Clickable to reset */}
                    <div className="absolute right-6 top-6">
                      <button onClick={handleArtistBadgeClick}>
                        <Badge className="cursor-pointer rounded-full bg-success px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-success/90">
                          Artist
                        </Badge>
                      </button>
                    </div>

                    {/* Profile Photo and Info */}
                    <div className="flex items-start gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                        <img
                          src="https://images.unsplash.com/photo-1664482017668-91158897414c?q=80&w=2342&auto=format&fit=crop"
                          alt="Aria Solen"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 pt-2">
                        {/* Artist Name */}
                        <h2 className="mb-3 font-pixel text-2xl font-bold text-foreground lg:text-3xl">
                          {userInfo.artistName || userInfo.fullName || "Your Name"}
                        </h2>

                        {/* Artist Description */}
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
                          {userInfo.description}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border"></div>

                    {/* NFT Wallet Link */}
                    <button
                      onClick={handleWalletClick}
                      className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="text-base lg:text-lg">
                        My NFT Wallet
                      </span>
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </Card>
              </div>

              {/* Content Area - Right side on desktop */}
              <div className="lg:flex-1">
                {/* Tab Navigation */}
                <div className="mb-6 flex">
                  <button
                    onClick={() => setActiveTab("protected")}
                    className={`rounded-2xl px-6 py-3 text-base font-semibold transition-colors ${
                      activeTab === "protected"
                        ? "bg-primary text-white"
                        : "border border-border bg-transparent text-muted-foreground"
                    }`}
                  >
                    Protected
                  </button>
                  <button
                    onClick={() => setActiveTab("for-sale")}
                    className={`ml-4 rounded-2xl px-6 py-3 text-base font-semibold transition-colors ${
                      activeTab === "for-sale"
                        ? "bg-primary text-white"
                        : "border border-border bg-transparent text-muted-foreground"
                    }`}
                  >
                    For Sale
                  </button>
                </div>

                {/* Content based on active tab */}
                {activeTab === "protected" && (
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                    {protectedArtworks.map((artwork, index) => (
                      <Card
                        key={artwork.id}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl border-0 bg-secondary transition-transform duration-200 hover:scale-[1.02]"
                        onClick={() => handleProtectedArtworkClick(artwork.id)}
                      >
                        {/* Artwork Image */}
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="h-full w-full object-cover"
                          />

                          {/* Tracking Badge - Only on first artwork */}
                          {index === 0 && (
                            <div className="absolute bottom-3 left-3">
                              <Badge className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                                Tracking
                              </Badge>
                            </div>
                          )}

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === "for-sale" && (
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                    {forSaleArtworks.map((artwork) => (
                      <Card
                        key={artwork.id}
                        className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-secondary transition-transform duration-200 hover:scale-[1.02]"
                        onClick={() => handleForSaleArtworkClick(artwork.id)}
                      >
                        {/* Artwork Image */}
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="h-full w-full object-cover"
                          />

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}
