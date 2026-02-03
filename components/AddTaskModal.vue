<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        @click.self="emit('close')"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content kanban-modal p-4">
            <div class="modal-header border-0 pb-0">
              <h5 class="modal-title">
                {{ editingTask ? 'Edit task' : 'New task' }}
              </h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="emit('close')"
              ></button>
            </div>
            <form @submit.prevent="submit">
              <div class="modal-body pt-2">
                <div class="mb-3">
                  <label class="form-label">Title</label>
                  <input
                    v-model="form.title"
                    type="text"
                    class="form-control form-control-kanban"
                    placeholder="Task title"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Description (optional)</label>
                  <textarea
                    v-model="form.description"
                    class="form-control form-control-kanban"
                    rows="3"
                    placeholder="Add details..."
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Column</label>
                  <select
                    v-model="form.columnId"
                    class="form-select form-select-kanban"
                  >
                    <option
                      v-for="col in columns"
                      :key="col.id"
                      :value="col.id"
                    >
                      {{ col.title }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Priority</label>
                  <select
                    v-model="form.priority"
                    class="form-select form-select-kanban"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-outline-secondary px-4 me-3" @click="emit('close')">
                  Cancel
                </button>
                <button type="submit" class="btn btn-cyan px-5">
                  {{ editingTask ? 'Save' : 'Add task' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Task, ColumnId } from '~/types/kanban'

const props = defineProps<{
  modelValue: boolean
  columnId: ColumnId
  editTask: Task | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
  saved: [payload: { title: string; description?: string; columnId: ColumnId; priority?: Task['priority']; id?: string }]
}>()

const { columns } = useKanban()

const form = reactive({
  title: '',
  description: '',
  columnId: props.columnId as ColumnId,
  priority: 'medium' as Task['priority'],
})

watch(
  () => [props.modelValue, props.editTask, props.columnId] as const,
  ([visible, task, colId]) => {
    if (visible) {
      form.columnId = colId
      if (task) {
        form.title = task.title
        form.description = task.description || ''
        form.priority = task.priority || 'medium'
      } else {
        form.title = ''
        form.description = ''
        form.priority = 'medium'
      }
    }
  },
  { immediate: true }
)

const editingTask = computed(() => props.editTask)

function submit() {
  emit('saved', {
    title: form.title.trim(),
    description: form.description.trim() || undefined,
    columnId: form.columnId,
    priority: form.priority,
  })
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--kanban-modal-backdrop);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
}

.modal-dialog {
  width: 100%;
  min-width: 320px;
  max-width: 800px;
}

.kanban-modal {
  background: var(--kanban-surface);
  border: 1px solid var(--kanban-border-strong);
  border-radius: 20px;
  color: var(--kanban-text);
  box-shadow: var(--kanban-modal-shadow);
}

.kanban-modal .modal-title {
  font-weight: 600;
}

.form-control-kanban,
.form-select-kanban {
  background: var(--kanban-input-bg);
  border: 1px solid var(--kanban-input-border);
  color: var(--kanban-text);
  border-radius: 12px;
}

.form-control-kanban::placeholder {
  color: var(--kanban-text-muted);
}

.form-control-kanban:focus,
.form-select-kanban:focus {
  background: var(--kanban-input-focus-bg);
  border-color: var(--kanban-accent);
  color: var(--kanban-text);
  box-shadow: 0 0 0 3px var(--kanban-accent-soft);
}

.btn-cyan {
  background: linear-gradient(145deg, #f97316 0%, #fb923c 50%, #eab308 100%);
  border: none;
  color: #1a0a2e;
  font-weight: 700;
  border-radius: 12px;
  padding: 0.55rem 1.35rem;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
}

.btn-cyan:hover {
  background: linear-gradient(145deg, #fb923c 0%, #f97316 50%, #eab308 100%);
  color: #1a0a2e;
  box-shadow: 0 6px 28px rgba(249, 115, 22, 0.5);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-dialog,
.modal-leave-active .modal-dialog {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
  transform: scale(0.95);
}
</style>
