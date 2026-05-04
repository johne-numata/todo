import { Todo, FilterType } from '../types'
import TodoItem from './TodoItem'

interface Props {
  todos: Todo[]
  filter: FilterType
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, filter, onToggle, onEdit, onDelete }: Props) {
  if (todos.length === 0) {
    const message =
      filter === 'completed'
        ? '完了したタスクはありません'
        : filter === 'active'
          ? 'すべてのタスクが完了しています'
          : 'タスクを追加して始めましょう'

    return (
      <div className="empty-state">
        <svg className="empty-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="6" width="32" height="36" rx="4" />
          <line x1="16" y1="16" x2="32" y2="16" />
          <line x1="16" y1="24" x2="32" y2="24" />
          <line x1="16" y1="32" x2="24" y2="32" />
        </svg>
        <p className="empty-text">{message}</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
