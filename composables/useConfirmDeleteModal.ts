import type { Task } from '~/types/kanban'

export function useConfirmDeleteModal() {
  const showModal = useState('confirm-delete-modal-show', () => false)
  const taskToDelete = useState<Task | null>('confirm-delete-modal-task', () => null)

  function open(task: Task) {
    taskToDelete.value = task
    showModal.value = true
  }

  function close() {
    showModal.value = false
    taskToDelete.value = null
  }

  return {
    showModal,
    taskToDelete,
    open,
    close,
  }
}
