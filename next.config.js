import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin();

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
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
