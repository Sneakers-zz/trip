/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'openweathermap.org',
            pathname: '/img/w/**',
          },
          {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
            pathname: "/u/**",
          },
          {
            protocol: 'https',
            hostname: 's3.amazonaws.com',
            pathname: '/openfarm-project/production/media/pictures/attachments/**',
          },
        ],
      },

};

export default config;

// next.config.js

