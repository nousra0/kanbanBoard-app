import type { Task, Column, ColumnId } from '~/types/kanban'

const STORAGE_KEY = 'kanban-board-tasks'

const defaultColumns: Column[] = [
  { id: 'todo', title: 'To Do', icon: 'bi-inbox', color: '#f97316' },
  { id: 'in-progress', title: 'In Progress', icon: 'bi-arrow-repeat', color: '#0ea5e9' },
  { id: 'blocked', title: 'Blocked', icon: 'bi-pause-circle', color: '#8b5cf6' },
  { id: 'review', title: 'Review', icon: 'bi-eye', color: '#eab308' },
  { id: 'testing', title: 'Testing', icon: 'bi-clipboard-check', color: '#ec4899' },
  { id: 'done', title: 'Done', icon: 'bi-check2-circle', color: '#10b981' },
]

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Welcome to your Kanban',
    description: 'Drag cards between columns to organize your work.',
    columnId: 'todo',
    createdAt: new Date().toISOString(),
    priority: 'medium',
  },
  {
    id: '2',
    title: 'Add new tasks',
    description: 'Click the + button in any column.',
    columnId: 'todo',
    createdAt: new Date().toISOString(),
    priority: 'low',
  },
  {
    id: '3',
    title: 'Customize your workflow',
    description: 'Edit or delete cards with the menu.',
    columnId: 'in-progress',
    createdAt: new Date().toISOString(),
    priority: 'high',
  },
]

function loadTasks(): Task[] {
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Task[]
        return parsed.length ? parsed : defaultTasks
      }
    } catch (_) {}
  }
  return defaultTasks
}

function saveTasks(tasks: Task[]) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }
}

export function useKanban() {
  const tasks = useState<Task[]>('kanban-tasks', () => loadTasks())

  const columns = computed(() => defaultColumns)

  const tasksByColumn = computed(() => {
    const map: Record<ColumnId, Task[]> = {
      todo: [],
      'in-progress': [],
      blocked: [],
      review: [],
      testing: [],
      done: [],
    }
    for (const task of tasks.value) {
      map[task.columnId].push(task)
    }
    return map
  })

  function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    tasks.value = [...tasks.value, newTask]
    saveTasks(tasks.value)
    return newTask
  }

  function updateTask(id: string, updates: Partial<Task>) {
    tasks.value = tasks.value.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    )
    saveTasks(tasks.value)
  }

  function moveTask(taskId: string, targetColumnId: ColumnId) {
    tasks.value = tasks.value.map((t) =>
      t.id === taskId ? { ...t, columnId: targetColumnId } : t
    )
    saveTasks(tasks.value)
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
    saveTasks(tasks.value)
  }

  function getTasksForColumn(columnId: ColumnId) {
    return tasksByColumn.value[columnId]
  }

  function getTaskById(id: string): Task | undefined {
    return tasks.value.find((t) => t.id === id)
  }

  return {
    tasks,
    columns,
    tasksByColumn,
    addTask,
    updateTask,
    moveTask,
    deleteTask,
    getTasksForColumn,
    getTaskById,
  }
}
