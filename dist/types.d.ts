
import type { ModuleOptions, ModuleHooks, ModuleRuntimeHooks, ModuleRuntimeConfig, ModulePublicRuntimeConfig } from './module'

declare module '#app' {
  interface RuntimeNuxtHooks extends ModuleRuntimeHooks {}
}

declare module '@nuxt/schema' {
  interface NuxtConfig { ['nuxtjsWoosmap']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['nuxtjsWoosmap']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
  interface RuntimeConfig extends ModuleRuntimeConfig {}
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['nuxtjsWoosmap']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['nuxtjsWoosmap']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
  interface RuntimeConfig extends ModuleRuntimeConfig {}
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}
}


export type { default } from './module'
