export type ColumnId = 'todo' | 'in-progress' | 'blocked' | 'review' | 'testing' | 'done'

export interface Task {
  id: string
  title: string
  description?: string
  columnId: ColumnId
  createdAt: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
}

export interface Column {
  id: ColumnId
  title: string
  icon: string
  color: string
}
