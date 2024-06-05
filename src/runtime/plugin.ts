import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('plugin injected by woosmap-module')
  const config = useRuntimeConfig()
})
