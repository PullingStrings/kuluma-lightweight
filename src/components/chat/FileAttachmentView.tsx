"use client"
// import { readableFileSize } from "@/lib/fileUtils"
// import { useSignedUrl } from "@/hooks/useSignedUrl"
// import { useAuthStore } from "@/lib/auth"

export interface ApiFile {
  id: string
  originalName: string
  mimeType: string
  size: number
  signedUrl?: string // added for local use
}

// export default function FileAttachmentView({ files }: { files: ApiFile[] }) {
//   if (!files.length) return null

//   return (
//     <div className='mt-1 flex flex-col gap-2'>
//       {files
//         .filter((f) => f.id) // ⬅️ skip placeholders
//         .map((f) => (
//           <SignedThumb key={f.id} file={f} />
//         ))}
//     </div>
//   )
// }

// function SignedThumb({ file }: { file: ApiFile }) {
//   // ⬇️ useSignedUrl hook only called when id is defined
//   const { data: url } = useSignedUrl(file.id)
//   if (!url) return <div className='w-24 h-24 bg-muted animate-pulse' />

//   const src = `${process.env.NEXT_PUBLIC_API_URL}${url}`
//   return file.mimeType.startsWith("image/") ? (
//     <img
//       src={src}
//       width={100}
//       height={100}
//       alt={file.originalName}
//       className='rounded mb-1'
//     />
//   ) : (
//     <>
//       <a
//         href={src}
//         target='_blank'
//         rel='noopener noreferrer'
//         className='text-sm underline'
//       >
//         {file.originalName}
//       </a>
//       <div className='text-xs text-muted-foreground'>
//         {file.mimeType} • {readableFileSize(file.size)}
//       </div>
//     </>
//   )
// }

export default function FileAttachmentView({ files }: { files: ApiFile[] }) {
  if (!files?.length) return null

  return (
    <div className='mt-1 flex flex-col gap-2'>
      {files.map((f) => {
        if (!f.signedUrl) return null // skip while loading
        const src = `${process.env.NEXT_PUBLIC_API_URL}${f.signedUrl}`
        return f.mimeType.startsWith("image/") ? (
          <img
            key={f.id}
            width={100}
            height={100}
            src={src}
            alt={f.originalName}
            className='rounded mb-1'
          />
        ) : (
          <a
            key={f.id}
            href={src}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm underline'
          >
            {f.originalName}
          </a>
        )
      })}
    </div>
  )
}
