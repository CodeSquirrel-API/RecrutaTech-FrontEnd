

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>


<template>
    <div class="greetings">
      <h1 class="green">{{ msg }}</h1>
      <h3>
        Meu nome é Ana
        <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
      </h3>
      <button class="btn"> Clica aqui</button>
    </div>
  </template>