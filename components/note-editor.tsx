import { useEffect, useState } from 'react'

interface NoteProps {
  note?: {
    title: string
    body: string
  }
  onUpdateNote: (note: { title: string; body: string }) => void
}

const NoteEditor = ({ note, onUpdateNote }: NoteProps) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setBody(note.body)
    }
  }, [note])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (note) {
        onUpdateNote({ ...note, title, body })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [title, body, note, onUpdateNote])

  if (!note) return <div className="w-2/3 p-4">Select a note</div>

  return (
    <div className="w-2/5 p-4 h-full flex flex-col">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full text-2xl font-bold mb-4"
        placeholder="Note title"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        className="size-full"
        placeholder="Note body"
      />
    </div>
  )
}

export default NoteEditor
