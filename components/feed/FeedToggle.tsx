"use client";

import { useState } from "react";
import { AppText } from "@/components/common/AppText";

export function FeedToggle() {
  const [active, setActive] = useState<"feed" | "following">("feed");

  return (
    <div>
      <div className="flex border-b border-medium-gray">
        <button
          onClick={() => setActive("feed")}
          className={`relative px-1 pb-3 transition-colors ${
            active === "feed"
              ? "text-ink"
              : "text-dark-gray hover:text-ink"
          }`}
        >
          <AppText as="span" variant="tinyLabel">
            Feed
          </AppText>
          {active === "feed" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-ink" />
          )}
        </button>

        <button
          onClick={() => setActive("following")}
          className={`ml-8 px-1 pb-3 transition-colors ${
            active === "following"
              ? "text-ink"
              : "text-dark-gray hover:text-ink"
          }`}
        >
          <AppText as="span" variant="tinyLabel">
            Following
          </AppText>
          {active === "following" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-ink" />
          )}
        </button>
      </div>
    </div>
  );
}
