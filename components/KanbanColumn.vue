<template>
  <div
    class="kanban-column"
    :class="{ 'kanban-column--drag-over': isDragOver, [`kanban-column--${column.id}`]: true }"
    :style="{ '--col-accent': column.color }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <div class="kanban-column__header">
      <span class="kanban-column__icon">
        <i :class="column.icon"></i>
      </span>
      <h2 class="kanban-column__title">{{ column.title }}</h2>
      <span class="kanban-column__count">{{ tasks.length }}</span>
    </div>
    <div class="kanban-column__cards">
      <KanbanCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task, Column } from '~/types/kanban'

const props = defineProps<{
  column: Column
  tasks: Task[]
}>()

const emit = defineEmits<{
  move: [taskId: string]
  edit: [task: Task]
  delete: [task: Task]
}>()

const isDragOver = ref(false)

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
  isDragOver.value = true
}

function onDragLeave() {
  isDragOver.value = false
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  const raw = e.dataTransfer?.getData('application/json') || e.dataTransfer?.getData('text/plain')
  if (!raw) return
  let taskId: string
  try {
    const data = JSON.parse(raw)
    taskId = data.taskId || data
  } catch {
    taskId = raw
  }
  emit('move', taskId)
}
</script>

<style scoped>
.kanban-column {
  background: var(--kanban-surface);
  border: 1px solid var(--kanban-border);
  border-radius: 18px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  backdrop-filter: blur(12px);
  border-top: 4px solid var(--col-accent);
}

.kanban-column--drag-over {
  border-color: var(--col-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--col-accent) 40%, transparent),
              0 12px 40px rgba(0, 0, 0, 0.3);
  transform: scale(1.01);
}

.kanban-column__header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--kanban-border);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.kanban-column__icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--col-accent) 35%, transparent);
  color: var(--col-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 12px color-mix(in srgb, var(--col-accent) 30%, transparent);
}

.kanban-column__title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
  color: var(--kanban-text);
  flex: 1;
}

.kanban-column__count {
  min-width: 28px;
  height: 28px;
  padding: 0 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--col-accent) 40%, transparent);
  color: var(--col-accent);
  font-size: 0.8rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.kanban-column__cards {
  flex: 1;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 80px;
}
</style>
