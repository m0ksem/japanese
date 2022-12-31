<template>
  <div class="md" ref="doc">
    <ContentDoc />
  </div>
</template>

<script setup lang="ts">
  // const doc = ref<HTMLElement>()

  // let watch = true
  // useDomObserver(doc, (el) => {
  //   setTimeout(() => {
  //     if (!watch) { return }
  //     if (!el) { return }
  //     el.innerHTML = el.innerHTML.replace(/WA/g, `<span class="jp-character">WA</span>`)
  //     watch = false
  //     setTimeout(() => {
  //       watch = true
  //     }, 300)      
  //   }, 500)

  // })
</script>

<style lang="scss">
  .md {
    blockquote {
      background: rgb(226, 226, 226);
      margin-left: 0;
      padding: 0.5rem 2rem;
    }

    .jp-character {
      background-color: red;
    }
  }
</style>