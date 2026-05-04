import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const startEdit = () => {
    setEditText(todo.text)
    setIsEditing(true)
  }

  const saveEdit = () => {
    onEdit(todo.id, editText)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <li className={`todo-item${todo.completed ? ' is-completed' : ''}`}>
      <button
        className={`todo-checkbox${todo.completed ? ' completed' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
      >
        {todo.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4.5 3.5 7 10 1" />
          </svg>
        )}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
        />
      ) : (
        <span
          className={`todo-text${todo.completed ? ' completed' : ''}`}
          onClick={startEdit}
          title="クリックして編集"
        >
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label="削除"
          title="削除"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>
      )}
    </li>
  )
}
