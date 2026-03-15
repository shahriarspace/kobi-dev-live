import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

const isCustomDomain = !!process.env.CUSTOM_DOMAIN;

export default defineConfig({
  site: isCustomDomain ? "https://kobidev.com" : "https://shahriarspace.github.io",
  base: isCustomDomain ? "/" : "/kobi-dev-live/",
  output: "static",
  integrations: [tailwind(), react()],
});
