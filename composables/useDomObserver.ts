import { Ref } from "vue"

export const useDomObserver = (target: Ref<HTMLElement | undefined>, cb: (el: HTMLElement) => void) => {
  let observer: MutationObserver | null = null
  watchEffect(() => {
    if (observer) {
      observer.disconnect()
    }

    if (!target.value) { return }
    observer = new MutationObserver(() => cb(target.value!))
  
    observer.observe(target.value, {
      childList: true
    })
  })
}