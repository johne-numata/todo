import { useState, KeyboardEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
  onToggleAll: () => void
  hasItems: boolean
  allCompleted: boolean
}

export default function TodoInput({ onAdd, onToggleAll, hasItems, allCompleted }: Props) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(value)
      setValue('')
    }
  }

  return (
    <div className="todo-input-container">
      {hasItems && (
        <button
          className={`toggle-all-btn${allCompleted ? ' all-completed' : ''}`}
          onClick={onToggleAll}
          aria-label="すべて完了にする"
          title="すべて完了 / 未完了"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 9 7 12 14 5" />
          </svg>
        </button>
      )}
      <input
        className="new-todo-input"
        type="text"
        placeholder="新しいタスクを入力して Enter..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  )
}
