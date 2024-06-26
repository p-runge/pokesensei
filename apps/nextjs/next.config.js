import { fileURLToPath } from "url";
import createJiti from "jiti";
import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin();

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/ui",
    "@acme/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    remotePatterns: [
      // PokeAPI sprites
      {
        hostname: "raw.githubusercontent.com",
      },
      // Discord profile pictures
      {
        hostname: "cdn.discordapp.com",
      },
    ],
  },
};

export default withNextIntl(config);
