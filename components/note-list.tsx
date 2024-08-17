import React from 'react'

interface NoteListProps {
  notes: { id: number; title: string; body: string }[]
  selectedNoteId: number | null
  onSelectNote: (id: string) => void
  onCreateNote: () => void
  onDeleteNote: (id: string) => void
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote
}) => {
  return (
    <div className="w-1/5 border-r flex flex-col">
      <button
        onClick={onCreateNote}
        className="p-2 bg-blue-500 text-white m-2 rounded"
      >
        New Note
      </button>
      {notes.map(note => (
        <div
          key={note.id}
          className={`p-2 flex justify-between items-center cursor-pointer ${
            note.id === selectedNoteId ? 'bg-gray-200' : ''
          }`}
        >
          <div onClick={() => onSelectNote(note.id.toString())}>
            {note.title}
          </div>
          <button
            onClick={() => onDeleteNote(note.id.toString())}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default NoteList