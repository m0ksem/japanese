<template>
  <div class="app">
    <Sidebar :items="links" style="padding-right: 2rem"/>
    <content>
      <NuxtPage />
    </content>
  </div>
</template>

<script setup lang="ts">
  import nav from './nav.json'
  import { Page } from './types/page';

  const links = nav as Page[]
</script>

<style lang="scss">
  body {
    background-color: #e6dbeb;
    margin: 0;
    padding: 2rem;
  }

  content {
    background-color: #f5f5f5;
    border-radius: 2rem;
    padding: 2rem;
    flex: 1;
  }

  .app {
    display: flex;
  }
</style>