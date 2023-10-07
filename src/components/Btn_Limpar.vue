<script setup lang="ts">
defineProps<{
  msg: string
}>()

import { useCssModule } from 'vue'

// inside setup() scope...
// default, returns classes for <style module>
useCssModule()

// named, returns classes for <style module="classes">
useCssModule('classes')

</script>


<template>
    <div class="greetings">
      <button class="btn-limpar">Limpar</button>
      
    </div>
  </template>

<style scoped>
  .btn-limpar{
    color: white;
    border: none;
    font-weight: bold;
    font-size: 12px;
    border-radius: 2px;
    background: #666;
    box-shadow: 0px 10px 15px -3px rgba(21, 23, 25, 0.16);
    height: 40px;
    width: 80px;
    margin-right: 10px;
  }
</style>