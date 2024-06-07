<template>
  <div class="container">
    <p>Nuxt Woosmap module testing playground app!</p>
    <br />
    <div>
      <input name="search" v-model="query" @input="testSearch" autofocus />
    </div>
    <br />
    <Woosmap />
    <br />
    <pre>
      {{ response }}
    </pre>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
// console.log(config.public.woosmap);

const { $woosmap } = useNuxtApp();

const map = useWoosmap()

const response = ref<any>();

const query = ref<string>("");

async function testSearch() {
  try {
    response.value = await ($woosmap as any).getLocalitySuggestions(
      query.value
    );
  } catch (e) {
    console.error(e);
  }
}
</script>

<style scoped>
body {
  display: grid;
  min-height: 100dvh;
  place-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 36rem;
  margin: 0 auto;
}

input {
  padding: 10px 8px;
}
</style>
