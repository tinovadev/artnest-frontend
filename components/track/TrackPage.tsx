"use client";

import {
  DotsThree,
  Info,
  Trash,
  PencilSimple,
  X,
  Shield,
} from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { trackingArtworks } from "@/data/tracking";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "normal" | "delete" | "edit";

export default function TrackPage() {
  const router = useRouter();
  const [artworks, setArtworks] = useState(trackingArtworks);
  const [mode, setMode] = useState<Mode>("normal");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showNoTheftModal, setShowNoTheftModal] = useState(false);

  const handleArtworkClick = (artworkId: string) => {
    if (mode !== "normal") return;

    if (artworkId === "1") {
      // Navigate to Sunny Garden detail page
      router.push(`/track/${artworkId}`);
    } else {
      // Show no theft history modal for other artworks
      setShowNoTheftModal(true);
    }
  };

  const handleTrackNow = (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Tracking artwork:", artworkId);
    // Implement tracking logic here
  };

  const handleDeleteSelected = () => {
    setArtworks((prev) =>
      prev.filter((artwork) => !selectedItems.includes(artwork.id)),
    );
    setSelectedItems([]);
    setMode("normal");
  };

  const handleToggleTracking = (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArtworks((prev) =>
      prev.map((artwork) =>
        artwork.id === artworkId
          ? {
              ...artwork,
              status: artwork.status === "tracking" ? "stopped" : "tracking",
            }
          : artwork,
      ),
    );
  };

  const handleSelectItem = (
    artworkId: string,
    checked: boolean,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    if (checked) {
      setSelectedItems((prev) => [...prev, artworkId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== artworkId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(artworks.map((artwork) => artwork.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setSelectedItems([]);
  };

  const handleCancel = () => {
    setMode("normal");
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />

      <ScrollArea className="mb-9 h-screen">
        <div className="pb-20 lg:pb-8 lg:pt-20">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
            <h1 className="font-pixel text-2xl font-bold text-foreground lg:text-3xl">
              Track
            </h1>

            {mode === "normal" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-lg p-2 transition-colors hover:bg-muted">
                    <DotsThree size={24} className="text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[140px] rounded-xl border-border bg-secondary p-2"
                >
                  <DropdownMenuItem
                    onClick={() => handleModeChange("edit")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                  >
                    <PencilSimple size={16} className="text-muted-foreground" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleModeChange("delete")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                  >
                    <Trash size={16} className="text-muted-foreground" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={handleCancel}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <X size={24} className="text-foreground" />
              </button>
            )}
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {/* Info Banner */}
            <Card className="mb-6 rounded-2xl border-primary/30 bg-primary/20 p-4">
              <div className="flex items-start gap-3">
                <Info size={20} className="mt-0.5 flex-shrink-0 text-primary" />
                <p className="text-sm font-medium text-primary lg:text-base">
                  Automatic tracking is performed once every day.
                </p>
              </div>
            </Card>

            {/* Delete Mode Header */}
            {mode === "delete" && (
              <div className="mb-4 flex items-center justify-between rounded-xl bg-secondary p-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={
                      selectedItems.length === artworks.length &&
                      artworks.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    className="border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  />
                  <span className="font-medium text-foreground">
                    Select All ({selectedItems.length}/{artworks.length})
                  </span>
                </div>
                {selectedItems.length > 0 && (
                  <Button
                    onClick={handleDeleteSelected}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Delete ({selectedItems.length})
                  </Button>
                )}
              </div>
            )}

            {/* Artwork List */}
            <div className="space-y-4">
              {artworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className={`rounded-2xl border-border bg-secondary p-6 ${
                    mode === "normal"
                      ? "cursor-pointer transition-colors hover:bg-secondary/80"
                      : ""
                  }`}
                  onClick={() => handleArtworkClick(artwork.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox for Delete Mode */}
                    {mode === "delete" && (
                      <Checkbox
                        checked={selectedItems.includes(artwork.id)}
                        onCheckedChange={(checked) =>
                          handleSelectItem(
                            artwork.id,
                            checked as boolean,
                            event as any,
                          )
                        }
                        className="border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                      />
                    )}

                    {/* Artwork Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 overflow-hidden rounded-xl bg-muted lg:h-20 lg:w-20">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Artwork Info */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="truncate pr-2 text-lg font-semibold text-foreground lg:text-xl">
                          {artwork.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                              artwork.status === "tracking"
                                ? "border-primary/30 bg-primary/20 text-primary"
                                : "border-border bg-muted text-muted-foreground"
                            }`}
                          >
                            {artwork.status === "tracking"
                              ? "Tracking"
                              : "Stop"}
                          </Badge>
                        </div>
                      </div>

                      <p className="mb-4 text-sm text-muted-foreground">
                        Latest Date {artwork.latestDate}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {mode === "normal" && (
                          <Button
                            onClick={(e) => handleTrackNow(artwork.id, e)}
                            className="rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                          >
                            Track Now
                          </Button>
                        )}

                        {mode === "edit" && (
                          <Button
                            onClick={(e) => handleToggleTracking(artwork.id, e)}
                            className={`rounded-xl px-6 py-2 text-sm font-semibold ${
                              artwork.status === "tracking"
                                ? "bg-muted text-foreground hover:bg-muted/80"
                                : "bg-primary text-white hover:bg-primary/90"
                            }`}
                          >
                            {artwork.status === "tracking" ? "Stop" : "Start"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <Navbar />

      {/* No Theft History Modal */}
      <Dialog open={showNoTheftModal} onOpenChange={setShowNoTheftModal}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="w-[calc(100svw-32px)] max-w-sm rounded-3xl border-0 bg-secondary p-8">
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <Shield size={32} className="text-success" />
            </div>

            <DialogTitle className="text-xl font-bold text-foreground">
              No theft history found.
            </DialogTitle>

            <p className="text-sm leading-relaxed text-muted-foreground">
              No theft cases have been
              <br />
              detected for this artwork so far.
            </p>

            <Button
              onClick={() => setShowNoTheftModal(false)}
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
