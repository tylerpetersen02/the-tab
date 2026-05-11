"use client";

import { useState } from "react";

export function FeedToggle() {
  const [active, setActive] = useState<"feed" | "following">("feed");

  return (
    <div className="px-5">
      <div className="flex border-b border-[#D4D0CC]">
        <button
          onClick={() => setActive("feed")}
          className={`relative px-1 pb-3 text-sm font-black transition-colors ${
            active === "feed"
              ? "text-[#001524]"
              : "text-[#8B8680] hover:text-[#001524]"
          }`}
        >
          FEED
          {active === "feed" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#001524]" />
          )}
        </button>

        <button
          onClick={() => setActive("following")}
          className={`ml-8 px-1 pb-3 text-sm font-black transition-colors ${
            active === "following"
              ? "text-[#001524]"
              : "text-[#8B8680] hover:text-[#001524]"
          }`}
        >
          FOLLOWING
          {active === "following" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#001524]" />
          )}
        </button>
      </div>
    </div>
  );
}
