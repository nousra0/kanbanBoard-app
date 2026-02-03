import type { Task, ColumnId } from '~/types/kanban'

export function useAddTaskModal() {
  const showModal = useState('add-task-modal-show', () => false)
  const columnId = useState<ColumnId>('add-task-modal-column', () => 'todo')
  const editingTask = useState<Task | null>('add-task-modal-edit', () => null)

  function openAdd(targetColumnId: ColumnId = 'todo') {
    columnId.value = targetColumnId
    editingTask.value = null
    showModal.value = true
  }

  function openEdit(task: Task) {
    editingTask.value = task
    columnId.value = task.columnId
    showModal.value = true
  }

  function close() {
    showModal.value = false
    editingTask.value = null
  }

  return {
    showModal,
    columnId,
    editingTask,
    openAdd,
    openEdit,
    close,
  }
}
