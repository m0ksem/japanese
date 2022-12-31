<template>
  <nav class="nav">
    <NuxtLink v-for="item in items" :to="`/${item.path}`">
      <li class="nav__item">
        {{ item.name }}
      </li>
      <div class="nav__children">
        <NuxtLink v-for="child in item.children" :to="`/${item.path}/${child.path}`">
          <li class="nav__item" >
            {{ child.name }}
          </li>
        </NuxtLink>
      </div>
    </NuxtLink>
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
</script>

<style lang="scss" scoped>
  .nav {
    &__item {
      list-style: none;
      padding: 1rem;
      border-radius: 1rem;
      color: black;
      text-decoration: none;

      &--acitve {
        background-color: #5e62e1;
        color: white;
      }
    }

    &__children {
      padding-left: 2rem;
    }
  }
</style>