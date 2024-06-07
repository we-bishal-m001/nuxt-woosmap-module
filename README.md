# Nuxt Woosmap

<!-- [![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href] -->

Woosmap services packed within a module configuration

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
- [📖 &nbsp;Documentation](https://developers.woosmap.com/api-reference/)

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

`Key` and `baseApiUrl` can also be provided in the environment configuration as;

```ts
WOOSMAP_API_KEY=woos-5222f84d-xxxx-xxxx-xxxxxxxxx
```

That's it! You can now use woosmap services in your Nuxt app ✨

## List of services and usage

- (localities autocomplete api)[https://developers.woosmap.com/products/localities/autocomplete/] 
- (localities details api)[https://developers.woosmap.com/products/localities/details/] 

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
