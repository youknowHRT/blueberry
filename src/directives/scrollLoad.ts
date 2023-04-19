import { DirectiveBinding } from 'vue'
interface ScrollLoadBinding extends DirectiveBinding {
  value: () => void
}
export default {
  mounted(el: HTMLDivElement, binding: ScrollLoadBinding) {
    const options = {
      root: null,
      threshold: 1.0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          binding.value()
        }
      })
    }, options)

    observer.observe(el)
  }
}
