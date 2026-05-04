import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

export default function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos()

  const allCompleted = allTodos.length > 0 && allTodos.every(t => t.completed)

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">TODO</h1>
        <p className="app-subtitle">タスクを整理して、一日を充実させよう</p>
      </header>
      <div className="card">
        <TodoInput
          onAdd={addTodo}
          onToggleAll={toggleAll}
          hasItems={allTodos.length > 0}
          allCompleted={allCompleted}
        />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
        {allTodos.length > 0 && (
          <TodoFooter
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  )
}
