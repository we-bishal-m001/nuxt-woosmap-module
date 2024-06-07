import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addTypeTemplate,
  addTemplate
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
  },

  setup(options, nuxt) {
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
      src: `https://sdk.woosmap.com/map/map.js?key=${woosmapApiKey}&callback=loadMap`,
      defer: true,
      onerror(e: Event) {
        console.error("Failed to load woosmap sdk", e);
      },
    };

    nuxt.options.app.head.script?.push(startupScript);

    /* expose types */
    const template = addTemplate({
      filename: "types/index.d.ts",
      getContents: () => `
        import { z } from "zod";

        const ConfigSchema = z.object({
          apiKey: z.string().min(12, "too short"),
          baseApiUrl: z.string().url("not a url"),
          fullScreenMap: z.boolean().optional()
        });

        export type WoosmapBaseConfig = z.infer<typeof ConfigSchema>;

        declare module "nuxtjs-woosmap" {
          interface PublicRuntimeConfig {
            woosmap: WoosmapBaseConfig;
          }
        }`,
    });

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: template.dst })
    })

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
