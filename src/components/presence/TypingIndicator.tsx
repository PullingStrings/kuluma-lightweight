"use client"
import { usePresenceStore } from "@/stores/presenceStore"
import { useAuthStore } from "@/lib/auth"
import { useParams } from "next/navigation"

export default function TypingIndicator() {
  const { cid } = useParams() as { cid: string }
  const typingSet = usePresenceStore((s) => s.typing[cid])
  const { user } = useAuthStore()
  if (!typingSet || typingSet.size === 0) return null

  const names = Array.from(typingSet)
    .filter((id) => id !== user?.id)
    .slice(0, 3)
  if (names.length === 0) return null

  return (
    <div className='px-4 pb-1 text-sm flex items-center gap-1'>
      <span>
        {names.length === 1
          ? "Someone is typing"
          : names.length + " people typing"}
      </span>
      <span className='animate-pulse'>…</span>
    </div>
  )
}
