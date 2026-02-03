const STORAGE_KEY = 'kanban-theme'

export default defineNuxtPlugin(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const isDark =
    stored === 'dark' ||
    (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
})
