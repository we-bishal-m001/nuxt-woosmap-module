import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("plugin injected by woosmap-module");
  const { woosmap } = useRuntimeConfig().public;

  const { apiKey, baseApiUrl } = woosmap;

  nuxtApp.provide("woosmap", woosmap);
});
