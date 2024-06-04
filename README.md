# Nuxt Woosmap

<!-- [![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href] -->

Woosmap services packed within a module configuration

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- 🗺️ &nbsp; Easy to use Woosmap services built out of the box
- 🚠 &nbsp; Compatible in SSR context
- 🌲 &nbsp; Simple map APIs to communicate with

## Quick Setup

Install the module to your Nuxt application with a single command:

```bash
npx nuxi module add nuxtjs-woosmap
```

## Usage

Add the module definition to your `nuxt.config` and pass options.

```ts
# Nuxt 3
export default defineNuxtConfig({
    modules: ['nuxtjs-woosmap'],

    woosmap: {
      key: `your_woosmap_public_apikey`
    }
})
```

That's it! You can now use nuxt-woosmap in your Nuxt app ✨


## Contribution

<details>
  <summary>Locally developed</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>
