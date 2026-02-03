<template>
  <div
    class="kanban-card"
    :class="{ 'kanban-card--dragging': isDragging, [`priority-${task.priority || 'medium'}`]: true }"
    draggable="true"
    role="button"
    tabindex="0"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @click="onCardClick"
    @keydown.enter="onCardClick"
  >
    <div class="kanban-card__content">
      <h3 class="kanban-card__title">{{ task.title }}</h3>
      <p v-if="task.description" class="kanban-card__description">
        {{ task.description }}
      </p>
      <div class="kanban-card__meta d-flex align-items-center justify-content-between flex-wrap gap-2 mt-2">
        <span v-if="task.priority" class="kanban-card__priority badge">
          {{ task.priority }}
        </span>
        <span class="kanban-card__date">
          {{ formatDate(task.createdAt) }}
        </span>
      </div>
    </div>
    <div class="kanban-card__actions">
      <button
        type="button"
        class="kanban-card__btn"
        title="Edit"
        @click.stop="emit('edit', task)"
      >
        <i class="bi bi-pencil"></i>
      </button>
      <button
        type="button"
        class="kanban-card__btn kanban-card__btn--danger"
        title="Delete"
        @click.stop="emit('delete', task)"
      >
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/kanban'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  edit: [task: Task]
  delete: [task: Task]
}>()

const isDragging = ref(false)
const lastActionWasDrag = ref(false)

function onCardClick() {
  if (lastActionWasDrag.value) {
    lastActionWasDrag.value = false
    return
  }
  navigateTo(`/task/${props.task.id}`)
}

function onDragStart(e: DragEvent) {
  if (!e.dataTransfer) return
  isDragging.value = true
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('application/json', JSON.stringify({ taskId: props.task.id }))
  e.dataTransfer.setData('text/plain', props.task.id)
  if (e.target instanceof HTMLElement) {
    e.target.style.opacity = '0.5'
  }
}

function onDragEnd(e: DragEvent) {
  isDragging.value = false
  lastActionWasDrag.value = true
  if (e.target instanceof HTMLElement) {
    e.target.style.opacity = '1'
  }
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (diff < 604800000) return d.toLocaleDateString([], { weekday: 'short' })
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.kanban-card {
  background: var(--kanban-card);
  border: 1px solid var(--kanban-border);
  border-radius: 14px;
  border-left: 4px solid var(--col-accent, var(--kanban-accent));
  padding: 1rem;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  position: relative;
  backdrop-filter: blur(8px);
}

.kanban-card:focus-visible {
  outline: 2px solid var(--kanban-accent);
  outline-offset: 2px;
}

.kanban-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--kanban-card-shadow),
              0 0 0 1px var(--kanban-border-strong);
  background: var(--kanban-card-hover, var(--kanban-card));
}

.kanban-card:active {
  cursor: grabbing;
}

.kanban-card--dragging {
  opacity: 0.7;
  transform: rotate(2deg) scale(0.98);
}

.kanban-card__content {
  padding-right: 2rem;
}

.kanban-card__title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.35rem 0;
  color: var(--kanban-text);
  line-height: 1.3;
}

.kanban-card__description {
  font-size: 0.8rem;
  color: var(--kanban-text-muted);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.kanban-card__date {
  font-size: 0.8rem;
  color: var(--kanban-text-muted);
  flex-shrink: 0;
}

.kanban-card__priority.badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.priority-low .kanban-card__priority {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(34, 197, 94, 0.25));
  color: #86efac;
  border: 1px solid rgba(34, 197, 94, 0.4);
}
.priority-medium .kanban-card__priority {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.4), rgba(234, 179, 8, 0.25));
  color: #fde047;
  border: 1px solid rgba(234, 179, 8, 0.4);
}
.priority-high .kanban-card__priority {
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.4), rgba(244, 114, 182, 0.25));
  color: #fbcfe8;
  border: 1px solid rgba(244, 114, 182, 0.4);
}

.kanban-card__actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.kanban-card:hover .kanban-card__actions {
  opacity: 1;
}

.kanban-card__btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: var(--kanban-icon-btn-bg);
  color: var(--kanban-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.kanban-card__btn:hover {
  background: var(--kanban-icon-btn-hover);
  color: var(--kanban-accent);
}

.kanban-card__btn--danger:hover {
  background: rgba(244, 114, 182, 0.25);
  color: var(--kanban-danger);
}
</style>
