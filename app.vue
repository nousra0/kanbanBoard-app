<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* ========== Light theme (default) ========== */
:root {
  --kanban-bg: linear-gradient(160deg, #f0f4ff 0%, #e8eeff 35%, #dce4f7 70%, #f0f4ff 100%);
  --kanban-surface: rgba(255, 255, 255, 0.92);
  --kanban-card: rgba(255, 255, 255, 0.95);
  --kanban-card-hover: rgba(255, 255, 255, 0.98);
  --kanban-border: rgba(0, 0, 0, 0.08);
  --kanban-border-strong: rgba(0, 0, 0, 0.14);
  --kanban-header-bg: rgba(255, 255, 255, 0.88);
  --kanban-text: #1e293b;
  --kanban-text-muted: #64748b;
  --kanban-accent: #7c3aed;
  --kanban-accent-soft: rgba(124, 58, 237, 0.18);
  --kanban-add-btn-bg: linear-gradient(145deg, #f97316 0%, #fb923c 50%, #eab308 100%);
  --kanban-add-btn-color: #1a0a2e;
  --kanban-input-bg: rgba(248, 250, 252, 0.95);
  --kanban-input-border: rgba(0, 0, 0, 0.12);
  --kanban-input-focus-bg: rgba(255, 255, 255, 1);
  --kanban-icon-btn-bg: rgba(0, 0, 0, 0.06);
  --kanban-icon-btn-hover: rgba(124, 58, 237, 0.12);
  --kanban-modal-backdrop: rgba(0, 0, 0, 0.4);
  --kanban-modal-shadow: 0 24px 60px rgba(0, 0, 0, 0.15);
  --kanban-card-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  --kanban-close-icon: #64748b;
  /* Column accents (same in both themes) */
  --col-todo: #f97316;
  --col-todo-soft: rgba(249, 115, 22, 0.25);
  --col-progress: #0ea5e9;
  --col-progress-soft: rgba(14, 165, 233, 0.25);
  --col-review: #eab308;
  --col-review-soft: rgba(234, 179, 8, 0.25);
  --col-done: #10b981;
  --col-done-soft: rgba(16, 185, 129, 0.25);
  --kanban-success: #34d399;
  --kanban-warning: #fbbf24;
  --kanban-danger: #f472b6;
  --font-outfit: 'Outfit', system-ui, sans-serif;
}

/* ========== Dark theme ========== */
html.dark {
  --kanban-bg: linear-gradient(160deg, #1a0a2e 0%, #16213e 35%, #0f3460 70%, #1a0a2e 100%);
  --kanban-surface: rgba(26, 26, 46, 0.92);
  --kanban-card: rgba(38, 35, 58, 0.9);
  --kanban-card-hover: rgba(50, 47, 72, 0.95);
  --kanban-border: rgba(255, 255, 255, 0.08);
  --kanban-border-strong: rgba(255, 255, 255, 0.14);
  --kanban-header-bg: rgba(26, 10, 46, 0.88);
  --kanban-text: #f8fafc;
  --kanban-text-muted: #a1a1aa;
  --kanban-accent: #a78bfa;
  --kanban-accent-soft: rgba(167, 139, 250, 0.2);
  --kanban-add-btn-bg: linear-gradient(145deg, #f97316 0%, #fb923c 50%, #eab308 100%);
  --kanban-add-btn-color: #1a0a2e;
  --kanban-input-bg: rgba(38, 35, 58, 0.9);
  --kanban-input-border: rgba(255, 255, 255, 0.14);
  --kanban-input-focus-bg: rgba(50, 47, 72, 0.95);
  --kanban-icon-btn-bg: rgba(255, 255, 255, 0.08);
  --kanban-icon-btn-hover: rgba(167, 139, 250, 0.2);
  --kanban-modal-backdrop: rgba(0, 0, 0, 0.6);
  --kanban-modal-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  --kanban-card-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  --kanban-close-icon: #f8fafc;
}

* {
  box-sizing: border-box;
}

html {
  font-family: var(--font-outfit);
  background: var(--kanban-bg);
  min-height: 100vh;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--kanban-text);
}

/* Theme-aware modal close button */
.kanban-modal .btn-close {
  filter: none;
  opacity: 0.8;
}
html:not(.dark) .kanban-modal .btn-close {
  --bs-btn-close-color: var(--kanban-close-icon);
  filter: none;
}
html.dark .kanban-modal .btn-close {
  --bs-btn-close-color: var(--kanban-close-icon);
  filter: invert(1);
}
</style>
