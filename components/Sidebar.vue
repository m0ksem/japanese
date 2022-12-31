<template>
  <nav class="nav">
    <SidebarItem v-for="item in items" :item="item" />
  </nav>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { Page } from '@/types/page'

  defineProps({
    items: {
      type: Array as PropType<Page[]>, required: true
    }
  })

  const route = useRoute()
</script>
