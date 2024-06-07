import {
  defineNuxtModule,
  addPlugin,
  installModule,
  createResolver,
  addTemplate,
  addImportsDir,
  addComponentsDir,
} from "@nuxt/kit";
import { defu } from "defu";
import type { WoosmapBaseConfig } from "./runtime/types";
import { fileURLToPath } from "node:url";

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
    baseApiUrl:
      (process.env.WOOSMAP_BASE_API_URL as string) || "https://api.woosmap.com",
    isLoaded: false,
    fullScreenMap: false,
    radiusOfSearch: undefined,
    onMapLoad: () => {},
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.woosmap = defu(
      nuxt.options.runtimeConfig.public.woosmap,
      { ...options }
    );

    const woosmapApiKey = nuxt.options.runtimeConfig.public.woosmap.apiKey;

    // Make sure the key is set or throw a warning
    if (!woosmapApiKey) {
      console.warn(
        "Missing woosmap public api key, set it either in `nuxt.config` or by env variable as WOOSMAP_API_KEY"
      );
    }

    const startupScript = {
      hid: "woosmap",
      src: `https://sdk.woosmap.com/map/map.js?key=${woosmapApiKey}&callback=onMapLoad`,
      defer: true,
      onerror(e: Event) {
        console.error("Failed to load woosmap sdk", e);
      },
    };

    nuxt.options.app.head.script?.push(startupScript);

    /* expose types */
    const template = addTemplate({
      filename: "types/index.d.ts",
      getContents: () => [``].join("\n"),
    });

    nuxt.hook("prepare:types", ({ references }) => {
      references.push({ path: template.dst });
    });

    // Composables auto-import
    addImportsDir(resolver.resolve("runtime/composables"));

    // Components auto-import
    addComponentsDir({ path: resolver.resolve("runtime/components") });

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    // Tailwind
    nuxt.options.css.push(
      resolver.resolve("./runtime/assets/tailwindmainstyles.css")
    );

    await installModule("@nuxtjs/tailwindcss", {
      exposeConfig: true,
      config: {
        darkMode: "class",
        content: {
          files: [resolver.resolve("./runtime/components/**/*.{vue,mjs,ts}")],
        },
      },
    });

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
