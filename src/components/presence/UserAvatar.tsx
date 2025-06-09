"use client"
import { ApiUser } from "@/lib/auth"
import { usePresenceStore } from "@/stores/presenceStore"
import clsx from "clsx"

export default function UserAvatar({
  user,
  size = 32,
}: {
  user: ApiUser
  size?: number
}) {
  const online = usePresenceStore((s) => s.online[user.id])
  const initials = (user.displayName || user.username).slice(0, 2).toUpperCase()

  return (
    <div className='relative' style={{ width: size, height: size }}>
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          className='w-full h-full rounded-full object-cover'
        />
      ) : (
        <div className='w-full h-full rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
          {initials}
        </div>
      )}
      <span
        className={clsx(
          "absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full border-2 border-background",
          online ? "bg-green-500" : "bg-gray-400"
        )}
      />
    </div>
  )
}
