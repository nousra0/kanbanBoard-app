<template>
  <div class="kanban-board">
    <div class="kanban-board__columns">
      <KanbanColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :tasks="getTasksForColumn(column.id)"
        @move="(taskId) => moveTask(taskId, column.id)"
        @edit="openEditModal"
        @delete="handleDelete"
      />
    </div>
    <AddTaskModal
      v-model="showAddModal"
      :column-id="addModalColumnId"
      :edit-task="editingTask"
      @saved="onTaskSaved"
      @close="closeModals"
    />
    <ConfirmDeleteModal
      v-model="showDeleteModal"
      :task="taskToDelete"
      @close="closeDeleteModal"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task, ColumnId } from '~/types/kanban'

const {
  columns,
  getTasksForColumn,
  addTask,
  updateTask,
  moveTask,
  deleteTask,
} = useKanban()

const {
  showModal: showAddModal,
  columnId: addModalColumnId,
  editingTask,
  openEdit: openEditModal,
  close: closeModals,
} = useAddTaskModal()

const {
  showModal: showDeleteModal,
  taskToDelete,
  open: openDeleteModal,
  close: closeDeleteModal,
} = useConfirmDeleteModal()

function onTaskSaved(payload: { title: string; description?: string; columnId: ColumnId; priority?: Task['priority']; id?: string }) {
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

function handleDelete(task: Task) {
  openDeleteModal(task)
}

function onConfirmDelete() {
  if (taskToDelete.value) {
    deleteTask(taskToDelete.value.id)
    closeDeleteModal()
  }
}
</script>

<style scoped>
.kanban-board {
  width: 100%;
  min-height: calc(100vh - 120px);
  overflow: hidden;
}

.kanban-board__columns {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.25rem;
  align-items: start;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.5rem;
  min-height: calc(100vh - 120px);
}

.kanban-board__columns::-webkit-scrollbar {
  height: 10px;
}

.kanban-board__columns::-webkit-scrollbar-track {
  background: var(--kanban-surface);
  border-radius: 5px;
}

.kanban-board__columns::-webkit-scrollbar-thumb {
  background: var(--kanban-border-strong);
  border-radius: 5px;
}

.kanban-board__columns::-webkit-scrollbar-thumb:hover {
  background: var(--kanban-accent);
}

.kanban-board__columns :deep(.kanban-column) {
  flex: 0 0 360px;
  min-width: 360px;
}
</style>
