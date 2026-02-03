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
                Delete task
              </h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="emit('close')"
              ></button>
            </div>
            <div class="modal-body pt-2">
              <p class="confirm-delete-text">
                Are you sure you want to delete
                <strong class="confirm-delete-title">"{{ task?.title }}"</strong>?
                This cannot be undone.
              </p>
            </div>
            <div class="modal-footer border-0 pt-0 mt-4">
              <button type="button" class="btn btn-outline-secondary px-4 me-3" @click="emit('close')">
                Cancel
              </button>
              <button type="button" class="btn btn-danger-delete px-5" @click="emit('confirm')">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Task } from '~/types/kanban'

defineProps<{
  modelValue: boolean
  task: Task | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
  confirm: []
}>()
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
  max-width: 440px;
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

.confirm-delete-text {
  margin: 0;
  color: var(--kanban-text);
  line-height: 1.5;
}

.confirm-delete-title {
  color: var(--kanban-accent);
  word-break: break-word;
}

.btn-danger-delete {
  background: linear-gradient(145deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  padding: 0.55rem 1.35rem;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
}

.btn-danger-delete:hover {
  background: linear-gradient(145deg, #ef4444 0%, #dc2626 50%, #f87171 100%);
  color: #fff;
  box-shadow: 0 6px 28px rgba(239, 68, 68, 0.5);
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
