'use client'

import React, { useState, useEffect } from 'react'

import NoteList from '@/components/note-list'
import NoteEditor from '@/components/note-editor'
import TodoList from '@/components/todo-list'

export function Todotes() {
  const [notes, setNotes] = useState<
    { id: number; title: string; body: string }[]
  >([])
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    setNotes(savedNotes)
    if (savedNotes.length > 0) setSelectedNoteId(savedNotes[0].id)
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  }, [notes])

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      body: ''
    }
    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
  }

  const deleteNote = (id: string) => {
    const noteId = parseInt(id, 10)
    setNotes(notes.filter(note => note.id !== noteId))
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null)
    }
  }

  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([])

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodos(savedTodos)
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(parseInt(id, 10))
  }

  return (
    <div className="flex h-screen">
      <NoteList
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={handleSelectNote}
        onCreateNote={createNewNote}
        onDeleteNote={deleteNote}
      />
      <NoteEditor
        note={notes.find(note => note.id === selectedNoteId)}
        onUpdateNote={updatedNote => {
          setNotes(
            notes.map(note =>
              note.id === updatedNote.id ? { ...note, ...updatedNote } : note
            )
          )
        }}
      />
      <TodoList
        todos={todos}
        onAddTodo={addTodo}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  )
}
