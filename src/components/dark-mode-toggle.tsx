"use client";

import Image from "next/image";
import { useTheme } from "./theme-provider";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/server/utils/cn";

type Particle = {
  angle: number;
};

const PARTICLE_AMOUNT = 10;

export default function DarkModeToggle() {
  const { scheme, setScheme } = useTheme();

  const [particles, setParticles] = useState<Particle[]>([]);
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

  return (
    <label className="flex cursor-pointer items-center gap-3">
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
      <span className="peer relative flex h-6 w-11 rounded-full border-2 border-gray-400 outline-none after:absolute after:-left-[2.25px] after:-top-[2px] after:start-0 after:h-6 after:w-6 after:rounded-full after:bg-gray-300 after:ring-2 after:ring-gray-400 after:transition-all after:content-[''] peer-checked:after:translate-x-5">
        <Image
          src="/images/electric.png"
          alt="light"
          width={20}
          height={20}
          priority
          className="rounded-l-full bg-[#e5c600] p-1 font-medium text-white"
        />

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
              <Image
                src={
                  scheme === "light"
                    ? "/images/electric.png"
                    : "/images/dark.png"
                }
                alt=""
                width={20}
                height={20}
                priority
                className={cn(
                  "animate-particle rounded-full p-1",
                  scheme === "light" ? "bg-[#e5c600]" : "bg-[#463e3e]",
                )}
              />
            </div>
          ))}
        </div>

        <Image
          src="/images/dark.png"
          alt="light"
          width={20}
          height={20}
          priority
          className="rounded-r-full bg-[#463e3e] p-1 font-medium text-white"
        />
      </span>
    </label>
  );
}
