<template>
  <div class="task-detail">
    <NuxtLink to="/" class="task-detail__back">
      <i class="bi bi-arrow-left"></i>
      Back to board
    </NuxtLink>

    <template v-if="task">
      <div class="task-detail__card">
        <div
          class="task-detail__accent"
          :style="{ background: column?.color ?? 'var(--kanban-accent)' }"
        />
        <div class="task-detail__body">
          <div class="task-detail__header">
            <h1 class="task-detail__title">{{ task.title }}</h1>
            <div class="task-detail__actions">
              <button
                type="button"
                class="task-detail__btn task-detail__btn--edit"
                title="Edit"
                @click="openEditModal(task)"
              >
                <i class="bi bi-pencil"></i>
                Edit
              </button>
              <button
                type="button"
                class="task-detail__btn task-detail__btn--danger"
                title="Delete"
                @click="handleDelete"
              >
                <i class="bi bi-trash"></i>
                Delete
              </button>
            </div>
          </div>

          <p v-if="task.description" class="task-detail__description">
            {{ task.description }}
          </p>
          <p v-else class="task-detail__description task-detail__description--muted">
            No description
          </p>

          <div class="task-detail__meta">
            <div class="task-detail__meta-item">
              <span class="task-detail__meta-label">Status</span>
              <span
                class="task-detail__meta-value task-detail__meta-value--status"
                :style="{ '--status-color': column?.color }"
              >
                <i v-if="column" :class="column.icon" class="me-1"></i>
                {{ column?.title ?? task.columnId }}
              </span>
            </div>
            <div class="task-detail__meta-item">
              <span class="task-detail__meta-label">Priority</span>
              <span
                class="task-detail__meta-value task-detail__priority"
                :class="`priority-${task.priority || 'medium'}`"
              >
                {{ (task.priority || 'medium').toUpperCase() }}
              </span>
            </div>
            <div class="task-detail__meta-item">
              <span class="task-detail__meta-label">Created</span>
              <span class="task-detail__meta-value">{{ formatDate(task.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="task-detail__not-found">
      <p>Task not found</p>
      <NuxtLink to="/" class="task-detail__back">Back to board</NuxtLink>
    </div>

    <AddTaskModal
      v-model="showAddModal"
      :column-id="addModalColumnId"
      :edit-task="editingTask"
      @saved="onTaskSaved"
      @close="closeModals"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task, ColumnId } from '~/types/kanban'

const route = useRoute()
const router = useRouter()
const taskId = computed(() => route.params.id as string)

const { getTaskById, updateTask, addTask, deleteTask, columns } = useKanban()
const {
  showModal: showAddModal,
  columnId: addModalColumnId,
  editingTask,
  openEdit: openEditModal,
  close: closeModals,
} = useAddTaskModal()

const task = computed(() => getTaskById(taskId.value))
const column = computed(() =>
  columns.value.find((c) => c.id === task.value?.columnId)
)

useHead({
  title: () => (task.value ? `${task.value.title} — Kanban` : 'Task — Kanban'),
})

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function onTaskSaved(payload: {
  title: string
  description?: string
  columnId: ColumnId
  priority?: Task['priority']
  id?: string
}) {
  if (editingTask.value) {
    updateTask(editingTask.value.id, {
      title: payload.title,
      description: payload.description,
      columnId: payload.columnId,
      priority: payload.priority,
    })
  } else {
    addTask({
      title: payload.title,
      description: payload.description,
      columnId: payload.columnId,
      priority: payload.priority,
    })
  }
  closeModals()
}

function handleDelete() {
  if (!task.value) return
  if (import.meta.client && window.confirm(`Delete "${task.value.title}"?`)) {
    deleteTask(task.value.id)
    closeModals()
    router.push('/')
  }
}
</script>

<style scoped>
.task-detail {
  max-width: 720px;
  margin: 0 auto;
}

.task-detail__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--kanban-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.task-detail__back:hover {
  color: var(--kanban-accent);
}

.task-detail__card {
  background: var(--kanban-surface);
  border: 1px solid var(--kanban-border);
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(12px);
}

.task-detail__accent {
  height: 6px;
  width: 100%;
}

.task-detail__body {
  padding: 1.5rem 1.75rem;
}

.task-detail__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.task-detail__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--kanban-text);
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.task-detail__actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.task-detail__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.task-detail__btn--edit {
  background: rgba(255, 255, 255, 0.08);
  color: var(--kanban-text);
}

.task-detail__btn--edit:hover {
  background: var(--kanban-accent-soft);
  color: var(--kanban-accent);
}

.task-detail__btn--danger {
  background: rgba(255, 255, 255, 0.06);
  color: var(--kanban-text-muted);
}

.task-detail__btn--danger:hover {
  background: rgba(244, 114, 182, 0.25);
  color: var(--kanban-danger);
}

.task-detail__description {
  font-size: 1rem;
  color: var(--kanban-text-muted);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  white-space: pre-wrap;
}

.task-detail__description--muted {
  font-style: italic;
  opacity: 0.8;
}

.task-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2rem;
}

.task-detail__meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.task-detail__meta-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--kanban-text-muted);
}

.task-detail__meta-value {
  font-size: 0.95rem;
  color: var(--kanban-text);
}

.task-detail__meta-value--status {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 10px;
  background: color-mix(in srgb, var(--status-color, var(--kanban-accent)) 30%, transparent);
  color: var(--status-color, var(--kanban-accent));
  font-weight: 600;
  width: fit-content;
}

.task-detail__priority {
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  width: fit-content;
}

.task-detail__priority.priority-low {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.35), rgba(34, 197, 94, 0.2));
  color: #86efac;
}

.task-detail__priority.priority-medium {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.35), rgba(234, 179, 8, 0.2));
  color: #fde047;
}

.task-detail__priority.priority-high {
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.35), rgba(244, 114, 182, 0.2));
  color: #fbcfe8;
}

.task-detail__not-found {
  text-align: center;
  padding: 3rem;
  color: var(--kanban-text-muted);
}

.task-detail__not-found .task-detail__back {
  margin-top: 1rem;
  margin-bottom: 0;
}
</style>
