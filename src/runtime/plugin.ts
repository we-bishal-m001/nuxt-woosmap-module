import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { WoosmapService } from "./services/woosmap";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("plugin injected by woosmap-module is working 🎉");

  const { apiKey, baseApiUrl } = useRuntimeConfig().public.woosmap;

  const woosmapService = new WoosmapService(apiKey, baseApiUrl);

  nuxtApp.provide("woosmap", woosmapService);
});
