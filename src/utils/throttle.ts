export const throttle = (fn: Function, wait: number) => {
  let timer: number | undefined = undefined
  return (...args: [any]) => {
    if (!timer) {
      fn(...args)
      timer = setTimeout(() => {
        timer = undefined
      }, wait)
    }
  }
}
