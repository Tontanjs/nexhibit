"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  contentClassName,
  speed = "40s",
  direction = "left",
  orientation = "horizontal",
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  speed?: string;
  direction?: "left" | "right" | "up" | "down";
  orientation?: "horizontal" | "vertical";
  pauseOnHover?: boolean;
}) {
  const animationName =
    orientation === "vertical"
      ? direction === "down"
        ? "nexhibit-marquee-y-down"
        : "nexhibit-marquee-y-up"
      : direction === "right"
        ? "nexhibit-marquee-right"
        : "nexhibit-marquee-left";

  return (
    <div className={cn("group/marquee overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          orientation === "vertical" ? "w-full flex-col" : "items-center",
          contentClassName,
        )}
        style={{ animation: `${animationName} ${speed} linear infinite` }}
      >
        <div className={cn("flex shrink-0", orientation === "vertical" ? "flex-col" : "items-center")}>{children}</div>
        <div className={cn("flex shrink-0", orientation === "vertical" ? "flex-col" : "items-center")} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
