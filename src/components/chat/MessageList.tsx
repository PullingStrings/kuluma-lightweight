"use client"
import MessageItem, { ApiMessage } from "./MessageItem"

export default function MessageList({
  messages,
  loading,
}: {
  messages: ApiMessage[]
  loading: boolean
}) {
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {loading && <p>Loading…</p>}
      {messages.map((m) => (
        <MessageItem key={m.id} msg={m} />
      ))}
    </div>
  )
}
