import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import {defu} from "defu"
import type { WoosmapBaseConfig } from './runtime/types/woosmap-config.type'

// Module options TypeScript interface definition
export type ModuleOptions = WoosmapBaseConfig

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxtjs-woosmap',
    configKey: 'nuxtjsWoosmap',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    apiKey: "",
    baseApiUrl: ""
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
