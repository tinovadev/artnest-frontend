"use client";

import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { DetectionResult } from "@/data/detection-results";
import { TrackingArtworkHistoryDto } from "@/lib/dto/tracking/get";
import { TrackingArtworkStatus } from "@/lib/model/artwork-tracking-history.model";
import { ApiArraySuccess, ApiSuccess } from "@/lib/types/global";
import { TrackingArtwork } from "@/lib/types/track";
import { useRouter } from "next/navigation";
import {
  DotsThree,
  Info,
  PencilSimple,
  Shield,
  Trash,
  X,
} from "phosphor-react";
import { useEffect, useState } from "react";

type Mode = "normal" | "delete" | "edit";

export default function TrackPage() {
  const router = useRouter();
  const [artworksTrackingHistory, setArtworkTrackingHistory] = useState<
    TrackingArtwork[]
  >([]);
  const [mode, setMode] = useState<Mode>("normal");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showNoTheftModal, setShowNoTheftModal] = useState(false);
  const [loadingArtworkId, setLoadingArtworkId] = useState<string | null>(null);

  useEffect(() => {
    const handler = async () => {
      const response = await fetch("/api/tracking", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Tracking artworks upload failed");
      }

      const parsedResponse =
        (await response.json()) as ApiArraySuccess<TrackingArtwork>;

      sessionStorage.setItem(
        "artworkTrackingHistory",
        JSON.stringify(parsedResponse.result),
      );

      setArtworkTrackingHistory(parsedResponse.result);
    };

    void handler();
  }, []);

  const handleArtworkClick = async (artworkId: string) => {
    if (mode !== "normal") return;

    const response = await fetch(`/api/tracking/${artworkId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Tracking artworks upload failed");
    }

    const parsedResponse =
      (await response.json()) as ApiSuccess<DetectionResult>;

    if (parsedResponse.result.verifiedThefts > 0) {
      router.push(`/track/${artworkId}`);
    } else {
      setShowNoTheftModal(true);
    }
  };

  const handleTrackNow = async (
    historyId: string,
    artworkId: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setLoadingArtworkId(historyId);

    const response = await fetch("/api/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artworkId,
        newStatus: TrackingArtworkStatus.Tracking,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Tracking artworks failed");
    }

    // Simulate tracking logic with a timeout
    setTimeout(() => {
      console.log("Tracking artwork:", artworkId);
      setLoadingArtworkId(null);
    }, 2000);
  };

  const handleDeleteSelected = () => {
    setArtworkTrackingHistory((prev) =>
      prev!.filter((artwork) => !selectedItems.includes(artwork.id)),
    );
    setSelectedItems([]);
    setMode("normal");
  };

  const handleToggleTracking = async (
    historyId: string,
    artworkId: string,
    currentStatus: TrackingArtworkStatus,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();

    const newStatus =
      currentStatus === TrackingArtworkStatus.Tracking
        ? TrackingArtworkStatus.Stopped
        : TrackingArtworkStatus.Tracking;

    const response = await fetch("/api/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artworkId,
        newStatus,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Tracking artworks failed");
    }

    const parsedResponse =
      (await response.json()) as ApiSuccess<TrackingArtworkHistoryDto>;

    setArtworkTrackingHistory((prev) =>
      prev!.map((history) =>
        history.id === historyId
          ? {
              ...history,
              status: newStatus,
            }
          : history,
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
      setSelectedItems(artworksTrackingHistory!.map((artwork) => artwork.id));
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
                      selectedItems.length ===
                        artworksTrackingHistory?.length &&
                      artworksTrackingHistory?.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    className="border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  />
                  <span className="font-medium text-foreground">
                    Select All ({selectedItems.length}/
                    {artworksTrackingHistory?.length})
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
              {artworksTrackingHistory?.map((history) => (
                <Card
                  key={history.id}
                  className={`rounded-2xl border-border bg-secondary p-6 ${
                    mode === "normal"
                      ? "cursor-pointer transition-colors hover:bg-secondary/80"
                      : ""
                  }`}
                  onClick={() => handleArtworkClick(history.artworkId)}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox for Delete Mode */}
                    {mode === "delete" && (
                      <Checkbox
                        checked={selectedItems.includes(history.id)}
                        onCheckedChange={(checked) =>
                          handleSelectItem(
                            history.id,
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
                          src={history.image}
                          alt={history.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Artwork Info */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="truncate pr-2 text-lg font-semibold text-foreground lg:text-xl">
                          {history.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                              history.status === TrackingArtworkStatus.Tracking
                                ? "border-primary/30 bg-primary/20 text-primary"
                                : "border-border bg-muted text-muted-foreground"
                            }`}
                          >
                            {history.status === TrackingArtworkStatus.Tracking
                              ? "Tracking"
                              : "Stop"}
                          </Badge>
                        </div>
                      </div>

                      <p className="mb-4 text-sm text-muted-foreground">
                        Latest Date {history.latestDate}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {mode === "normal" && (
                          <Button
                            onClick={(e) =>
                              handleTrackNow(history.id, history.artworkId, e)
                            }
                            className="rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                            disabled={loadingArtworkId === history.id}
                          >
                            {loadingArtworkId === history.id ? (
                              <div className="flex items-center gap-2">
                                <span className="loader h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Tracking...
                              </div>
                            ) : (
                              "Track Now"
                            )}
                          </Button>
                        )}

                        {mode === "edit" && (
                          <Button
                            onClick={(e) =>
                              handleToggleTracking(
                                history.id,
                                history.artworkId,
                                history.status,
                                e,
                              )
                            }
                            className={`rounded-xl px-6 py-2 text-sm font-semibold ${
                              history.status === TrackingArtworkStatus.Tracking
                                ? "bg-muted text-foreground hover:bg-muted/80"
                                : "bg-primary text-white hover:bg-primary/90"
                            }`}
                          >
                            {history.status === TrackingArtworkStatus.Tracking
                              ? "Stop"
                              : "Start"}
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
