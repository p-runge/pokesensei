import React from "react";
import { cn } from "~/server/utils/cn";

export default function Loader() {
  return (
    <div className="relative inline-flex h-20 w-20">
      {/* pulsing version of the loader fading out repeatedly */}
      <LoaderBase animate />
      {/* basic circle standing statically in the center */}
      <LoaderBase />
    </div>
  );
}

function LoaderBase({ animate }: { animate?: boolean }) {
  return (
    <div
      className={cn(
        "absolute left-5 top-5 inline-block h-10 w-10 rounded-full bg-primary",
        animate && "animate-ping",
      )}
    />
  );
}
