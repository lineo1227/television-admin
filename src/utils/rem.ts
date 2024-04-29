import { ref } from 'vue'
const baseSize = 19.2
export const pxToRem = ref(19.2)
function setRem() {
  const scale = document.documentElement.clientWidth / 1920
  pxToRem.value = baseSize * Math.min(scale, 2)
  document.documentElement.style.fontSize = pxToRem.value + 'px'
  return pxToRem
}
setRem()
window.addEventListener('resize', () => {
  setRem()
})
