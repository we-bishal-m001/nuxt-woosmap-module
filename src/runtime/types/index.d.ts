import { z } from "zod";

/*TODO: parsing */
const ConfigSchema = z.object({
  apiKey: z.string().min(12, "too short"),
  baseApiUrl: z.string().url("not a url"),
  fullScreenMap: z.boolean().optional(),
  isLoaded: z.boolean().optional()
});

export type WoosmapBaseConfig = z.infer<typeof ConfigSchema>;

declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    woosmap: WoosmapBaseConfig
  }
}
