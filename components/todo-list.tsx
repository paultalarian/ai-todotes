import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-react'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

interface TodoListProps {
  todos: TodoItem[]
  onAddTodo: (text: string) => void
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo
}) => {
  const [newTodoText, setNewTodoText] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      onAddTodo(newTodoText.trim())
      setNewTodoText('')
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2 mb-4"
      >
        <Input
          type="text"
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-300"
        />
        <Button type="submit" className="bg-violet-900 hover:bg-violet-950">
          Add
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className="pr-1 flex justify-between items-center cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleTodo(todo.id)}
              aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
              className="mr-2"
            />
            <span
              className={`text-sm w-full ${todo.completed ? 'line-through' : ''}`}
            >
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white"
              onClick={() => onDeleteTodo(todo.id)}
            >
              <Trash className="size-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList