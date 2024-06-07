import { useRuntimeConfig, useNuxtApp } from '#imports'

export const useWoosmap = () => {
  const nuxtApp = useNuxtApp()

  const { woosmap: runtimeConfig } = useRuntimeConfig().public

  return nuxtApp.$woosmap
}