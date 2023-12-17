"use client";

import Image from "next/image";
import { useTheme } from "./theme-provider";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/server/utils/cn";

type Icon = {
  angle: number;
};

const PARTICLE_AMOUNT = 10;

export default function DarkModeToggle() {
  const { scheme, setScheme } = useTheme();

  const [particles, setParticles] = useState<Icon[]>([]);
  const prevSchemeRef = useRef(scheme);

  function addParticles() {
    setParticles(
      [...Array<void>(PARTICLE_AMOUNT)].map(() => ({
        angle: Math.random() * 360,
      })),
    );

    prevSchemeRef.current = scheme;
  }

  useEffect(() => {
    // Only trigger particles if scheme has changed
    if (prevSchemeRef.current !== scheme) {
      addParticles();

      // clean up particles after animation
      const timeout = setTimeout(() => {
        setParticles([]);
      }, 1000);

      return () => clearTimeout(timeout);
    }

    prevSchemeRef.current = scheme;
  }, [scheme]);

  /**
   * Only render the toggle once the component has mounted since we need to wait for
   * the `useTheme` hook to be initialized.
   */
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) return null;

  return (
    <label className="flex animate-fade-in cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        /**
         * The value is controlled by the ThemeContext, so we can't use the
         * default behavior of the input element. Instead, we use the
         * `checked` prop and the `onClick` handler to update the value in
         * the context.
         */
        checked={scheme === "light"}
        onClick={() => {
          setScheme(scheme === "light" ? "dark" : "light");
        }}
        onChange={() => void null}
        className="peer sr-only"
      />
      <span
        className={cn(
          "peer relative flex w-11 outline-none",
          "after:absolute after:-left-[2px] after:-top-[2px] after:h-6 after:w-6 after:content-['']",
          "after:transition-transform peer-checked:after:translate-x-5",
          "rounded-full border-2 border-gray-400 after:rounded-full after:bg-gray-300 after:ring-2 after:ring-gray-400",
        )}
      >
        <Icon type="electric" />

        {/* explosion center */}
        <div
          className="relative -z-10 h-0 w-0 cursor-default"
          onClick={(ev) => ev.preventDefault()}
        >
          {/* particles */}
          {particles.map(({ angle }) => (
            <div
              key={angle}
              style={{
                transform: `rotate(${angle}deg)`,
              }}
              className="absolute -left-2.5 h-5 w-5 origin-center"
            >
              <Icon
                type={scheme === "light" ? "electric" : "dark"}
                isParticle
              />
            </div>
          ))}
        </div>

        <Icon type="dark" />
      </span>
    </label>
  );
}

function Icon({
  type,
  isParticle = false,
}: {
  type: "electric" | "dark";
  isParticle?: boolean;
}) {
  return (
    <Image
      src={
        type === "electric"
          ? "/images/electric.png"
          : type === "dark"
            ? "/images/dark.png"
            : ""
      }
      alt="light"
      width={20}
      height={20}
      priority
      className={cn(
        "p-1 font-medium text-white",
        type === "electric"
          ? "rounded-l-full bg-[#e5c600]"
          : "rounded-r-full bg-[#463e3e]",
        isParticle && "animate-shoot rounded-full",
      )}
    />
  );
}
