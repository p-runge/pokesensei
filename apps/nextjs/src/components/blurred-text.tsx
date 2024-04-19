"use client";

import React, { useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cn } from "~/server/utils/cn";

const BlurredText = ({ text }: { text: string }) => {
  const [isBlurred, setIsBlurred] = useState(true);

  return (
    <button className="relative" onClick={() => setIsBlurred(!isBlurred)}>
      <span className={cn(isBlurred && "font-bold blur-sm")}>
        {isBlurred
          ? // censor text with asterisks if blurred
            [...new Array(text.length)].map(() => "*").join("")
          : text}
      </span>
      {/* overlay */}
      <span
        className={`absolute inset-0 text-center ${isBlurred ? "" : "hidden"}`}
      >
        <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
      </span>
    </button>
  );
};

export default BlurredText;
