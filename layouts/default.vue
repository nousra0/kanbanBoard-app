<script setup lang="ts">
const { openAdd } = useAddTaskModal()
const { isDark, toggleTheme } = useTheme()

function openAddTask() {
  openAdd('todo')
}
</script>

<template>
  <div class="kanban-layout min-vh-100 d-flex flex-column">
    <header class="kanban-header py-3 px-4">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div class="d-flex align-items-center gap-3">
          <div class="kanban-logo">
            <i class="bi bi-kanban"></i>
          </div>
          <div>
            <h1 class="kanban-title mb-0">Kanban Board</h1>
            <p class="kanban-subtitle mb-0">Organize your workflow</p>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <button
            type="button"
            class="kanban-header__theme-btn"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <i class="bi bi-sun-fill" :class="{ 'theme-icon--active': !isDark }"></i>
            <i class="bi bi-moon-fill" :class="{ 'theme-icon--active': isDark }"></i>
          </button>
          <button type="button" class="kanban-header__add-btn" @click="openAddTask">
            <i class="bi bi-plus-lg"></i>
            <span>Add task</span>
          </button>
          <div class="kanban-header__badge">
            <i class="bi bi-droplet-fill"></i>
            <span>Tasks auto-save locally</span>
          </div>
        </div>
      </div>
    </header>
    <main class="kanban-main flex-grow-1 p-3 p-md-4 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.kanban-header {
  background: var(--kanban-header-bg);
  border-bottom: 1px solid var(--kanban-border-strong);
  backdrop-filter: blur(16px);
}

.kanban-logo {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(145deg, #f97316 0%, #fb923c 50%, #eab308 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 24px rgba(249, 115, 22, 0.45);
}

.kanban-title {
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--kanban-text);
}

.kanban-subtitle {
  font-size: 0.8rem;
  color: var(--kanban-text-muted);
  font-weight: 400;
}

.kanban-header__badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--kanban-text-muted);
}

.kanban-header__theme-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: var(--kanban-icon-btn-bg);
  color: var(--kanban-text-muted);
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background 0.2s, color 0.2s;
}

.kanban-header__theme-btn:hover {
  background: var(--kanban-icon-btn-hover);
  color: var(--kanban-accent);
}

.kanban-header__theme-btn .bi {
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s;
}

.kanban-header__theme-btn .theme-icon--active {
  opacity: 1;
  color: var(--kanban-accent);
}

.kanban-header__add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 12px;
  background: var(--kanban-add-btn-bg);
  color: var(--kanban-add-btn-color);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
}

.kanban-header__add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(249, 115, 22, 0.5);
}

.kanban-header__badge i {
  color: #0ea5e9;
}

.kanban-main {
  background: transparent;
}
</style>
