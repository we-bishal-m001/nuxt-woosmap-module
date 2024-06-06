import { z } from "zod";

/*TODO: parsing */
const ConfigSchema = z.object({
  apiKey: z.string().min(12, "too short"),
  baseApiUrl: z.string().url("not a url"),
});

export type WoosmapBaseConfig = z.infer<typeof ConfigSchema>;

declare module "nuxtjs-woosmap" {
  interface PublicRuntimeConfig {
    woosmap: WoosmapBaseConfig
  }
}
