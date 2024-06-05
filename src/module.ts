import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import { defu } from "defu";
import type { WoosmapBaseConfig } from "./runtime/types/woosmap-config.type";

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
      {
        apiKey: options.apiKey,
        baseApiUrl: options.baseApiUrl,
      }
    );

    // Make sure the key is set
    if (!nuxt.options.runtimeConfig.public.woosmap.apiKey) {
      console.warn(
        "Missing woosmap public api key, set it either in `nuxt.config` or by env variable as WOOSMAP_API_KEY"
      );
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
