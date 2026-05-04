import { FilterType } from '../types'

interface Props {
  activeCount: number
  completedCount: number
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  onClearCompleted: () => void
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了' },
]

export default function TodoFooter({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: Props) {
  return (
    <div className="todo-footer">
      <span className="todo-count">{activeCount}件残り</span>
      <div className="filter-buttons">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn${filter === f.value ? ' active' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        className="clear-btn"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        完了をクリア
      </button>
    </div>
  )
}
