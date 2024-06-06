import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import { defu } from "defu";
import type { WoosmapBaseConfig } from "./runtime/types";

// Module options TypeScript interface definition
export type ModuleOptions = WoosmapBaseConfig;

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxtjs-woosmap",
    configKey: "woosmap",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    apiKey: process.env.WOOSMAP_API_KEY as string,
    baseApiUrl: process.env.WOOSMAP_BASE_API_URL as string,
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.woosmap = defu(
      nuxt.options.runtimeConfig.public.woosmap,
      { ...options }
    );

    const woosmapApiKey = nuxt.options.runtimeConfig.public.woosmap.apiKey;

    // Make sure the key is set
    if (!woosmapApiKey) {
      console.warn(
        "Missing woosmap public api key, set it either in `nuxt.config` or by env variable as WOOSMAP_API_KEY"
      );
    }

    const startupScripts = {
      hid: "woosmap",
      src: `https://sdk.woosmap.com/map/map.js?key=${woosmapApiKey}&callback=loadMap`,
      defer: true,
      onerror(e: Event) {
        console.error(e, "Failed to load Woosmap sdk");
      },
    };

    nuxt.options.app.head.script?.push(startupScripts);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
