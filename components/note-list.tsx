import React from 'react'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

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
    <div className="flex flex-col">
      <div className="p-4 flex flex-col">
        <Button
          className="bg-violet-900 hover:bg-violet-950"
          onClick={onCreateNote}
        >
          New Note
        </Button>
      </div>
      <div>
        {notes.map(note => (
          <div
            key={note.id}
            className={`px-4 py-1 pr-1 flex justify-between items-center cursor-pointer transition-colors ${
              note.id === selectedNoteId ? 'bg-violet-100' : ''
            } hover:bg-violet-50`}
            onClick={() => onSelectNote(note.id.toString())}
          >
            <div className="text-sm">{note.title}</div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white">
                  <Trash className="size-4 text-violet-300" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDeleteNote(note.id.toString())}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NoteList