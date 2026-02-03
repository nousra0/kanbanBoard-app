const STORAGE_KEY = 'kanban-theme'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const isDark = useState<boolean>('theme-is-dark', () => true)

  function applyTheme(dark: boolean) {
    if (import.meta.client && document.documentElement) {
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    }
  }

  function initTheme() {
    if (import.meta.server) return
    // Sync with class already applied by theme.client.ts plugin (avoids flash)
    const dataTheme = document.documentElement.getAttribute('data-theme')
    if (dataTheme === 'dark' || dataTheme === 'light') {
      isDark.value = dataTheme === 'dark'
    } else {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored === 'light' || stored === 'dark') {
        isDark.value = stored === 'dark'
      } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      applyTheme(isDark.value)
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
    applyTheme(isDark.value)
  }

  function setTheme(theme: Theme) {
    isDark.value = theme === 'dark'
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(isDark.value)
  }

  onMounted(initTheme)

  return {
    isDark: readonly(isDark),
    toggleTheme,
    setTheme,
    initTheme,
  }
}
