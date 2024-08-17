import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Todotes'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session

  if (!session) {
    redirect('/login')
  }

  const missingKeys = await getMissingKeys()

  return <div>Hello</div>
}
