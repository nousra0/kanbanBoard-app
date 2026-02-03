<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  /* Rich dark base – warm indigo/charcoal */
  --kanban-bg: linear-gradient(160deg, #1a0a2e 0%, #16213e 35%, #0f3460 70%, #1a0a2e 100%);
  --kanban-surface: rgba(26, 26, 46, 0.92);
  --kanban-card: rgba(38, 35, 58, 0.9);
  --kanban-card-hover: rgba(50, 47, 72, 0.95);
  --kanban-border: rgba(255, 255, 255, 0.08);
  --kanban-border-strong: rgba(255, 255, 255, 0.14);
  /* Vibrant column accents */
  --col-todo: #f97316;
  --col-todo-soft: rgba(249, 115, 22, 0.25);
  --col-progress: #0ea5e9;
  --col-progress-soft: rgba(14, 165, 233, 0.25);
  --col-review: #eab308;
  --col-review-soft: rgba(234, 179, 8, 0.25);
  --col-done: #10b981;
  --col-done-soft: rgba(16, 185, 129, 0.25);
  /* UI accents */
  --kanban-accent: #a78bfa;
  --kanban-accent-soft: rgba(167, 139, 250, 0.2);
  --kanban-success: #34d399;
  --kanban-warning: #fbbf24;
  --kanban-danger: #f472b6;
  --kanban-text: #f8fafc;
  --kanban-text-muted: #a1a1aa;
  --font-outfit: 'Outfit', system-ui, sans-serif;
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
</style>
