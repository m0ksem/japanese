<template>
  <NuxtLink :to="`/${item.path}`">
    <li
      class="sidebar-item"
      :class="{
        'sidebar-item--active': route.path == `/${item.path}`,
        'sidebar-item--child-active': childActive,
      }"
    >
      {{ item.name }}
    </li>
    <div
      class="sidebar-item__children"
      :class="{
        'sidebar-item__children--active': childActive,
      }"
    >
      <SidebarItem v-for="child in item.children" :item="childify(child)" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Page } from "../types/page";

const props = defineProps({
  item: { type: Object as PropType<Page>, required: true },
});

const childify = (child: Page) => {
  return {
    ...child,
    path: `${props.item.path}/${child.path}`,
  } as Page;
};

const route = useRoute();

const childActive = computed(() => {
  if (!props.item.path) { return false }
  if (route.path === `/${props.item.path!}`) {
    return false;
  }

  return route.path.startsWith(`/${props.item.path!}`);
});
</script>

<style lang="scss" scoped>
$border-radius: 1rem;
$child-active-bg: #5e62e151;

a {
  text-decoration: none;
}

.sidebar-item {
  list-style: none;
  padding: 1rem;
  border-radius: $border-radius;
  color: black;
  text-decoration: none;

  &--active {
    background-color: #5e62e1;
    color: white;
  }

  &--child-active {
    background: $child-active-bg;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__children {
    padding-left: 2rem;
    padding-right: 1rem;
    padding-bottom: 0.25rem;

    &--active {
      background: $child-active-bg;
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>
