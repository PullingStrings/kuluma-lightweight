"use client"
import { ApiUser } from "@/lib/auth"
import FileAttachmentView, { ApiFile } from "./FileAttachmentView"
import UserAvatar from "@/components/presence/UserAvatar"

export interface ApiMessage {
  id: string
  content: string
  createdAt: string
  sender: ApiUser
  files: ApiFile[]
}

export default function MessageItem({ msg }: { msg: ApiMessage }) {
  return (
    <div className='flex gap-2'>
      <UserAvatar user={msg.sender} size={32} />
      <div className='min-w-0'>
        <p className='text-sm font-medium'>
          {msg.sender.displayName || msg.sender.username}{" "}
          <span className='text-muted-foreground text-xs font-normal'>
            {new Date(msg.createdAt).toLocaleTimeString()}
          </span>
        </p>
        {msg.content && (
          <p className='whitespace-pre-wrap break-words'>{msg.content}</p>
        )}
        <FileAttachmentView files={msg.files} />
      </div>
    </div>
  )
}
