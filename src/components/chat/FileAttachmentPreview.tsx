"use client"
import { readableFileSize } from "@/lib/fileUtils"
import Image from "next/image"

export interface PreviewFile {
  id: string // UUID
  file: File
  url: string // object URL for images
  error?: string // validation error
}

export default function FileAttachmentPreview({
  files,
  remove,
}: {
  files: PreviewFile[]
  remove: (id: string) => void
}) {
  if (!files.length) return null
  return (
    <div className='flex gap-2 flex-wrap mb-2'>
      {files.map((p) => (
        <div
          key={p.id}
          className='relative rounded border p-1 w-24 text-center text-xs'
        >
          {p.file.type.startsWith("image/") ? (
            <Image
              src={p.url}
              alt={p.file.name}
              className='w-full h-16 object-cover rounded'
              width={96}
              height={96}
            />
          ) : (
            <div className='h-16 flex items-center justify-center bg-muted rounded'>
              📄
            </div>
          )}
          <div className='truncate' title={p.file.name}>
            {p.file.name}
          </div>
          <div className='text-[10px] text-muted-foreground'>
            {p.error ?? readableFileSize(p.file.size)}
          </div>
          <button
            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 leading-3 text-[10px]'
            onClick={() => remove(p.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
