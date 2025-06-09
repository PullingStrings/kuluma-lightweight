"use client"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { socket } from "@/lib/socket"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip } from "lucide-react"
import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useDropzone } from "react-dropzone"
import api from "@/lib/api"
import FileAttachmentPreview, { PreviewFile } from "./FileAttachmentPreview"
import { MAX_FILE_SIZE, ALLOWED_MIME_TYPES } from "@/lib/fileUtils"

const schema = z.object({
  content: z.string().max(4000).optional(),
})

type FormData = z.infer<typeof schema>

export default function MessageComposer({ channelId }: { channelId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const { watch } = useForm<FormData>()
  const content = watch("content") // reactive value

  useEffect(() => {
    if (!channelId) return // guard
    socket.emit("typing", { channelId, isTyping: !!content })
    // auto-stop after 1 s silence
    const tid = setTimeout(
      () => socket.emit("typing", { channelId, isTyping: false }),
      1000
    )
    return () => clearTimeout(tid)
  }, [content, channelId])

  const [previews, setPreviews] = useState<PreviewFile[]>([])

  const onDrop = useCallback((accepted: File[]) => {
    const next: PreviewFile[] = accepted.map((file) => {
      let error: string | undefined
      if (!ALLOWED_MIME_TYPES.includes(file.type)) error = "type not allowed"
      else if (file.size > MAX_FILE_SIZE) error = "too large"
      return { id: uuidv4(), file, url: URL.createObjectURL(file), error }
    })
    setPreviews((p) => [...p, ...next])
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  })

  function remove(id: string) {
    setPreviews((prev) => prev.filter((p) => p.id !== id))
  }

  const onSubmit = async (data: FormData) => {
    if (!previews.length) {
      if (data.content?.trim())
        socket.emit("send_message", { channelId, content: data.content })
      reset()
      return
    }
    for (let i = 0; i < previews.length; i++) {
      const p = previews[i]
      if (p.error) continue
      const form = new FormData()
      form.append("file", p.file)
      if (i === 0 && data.content) form.append("message", data.content)
      await api.post(`/api/channels/${channelId}/files`, form)
    }
    setPreviews([])
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='shrink-0 border-t p-3 space-y-2'
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <FileAttachmentPreview files={previews} remove={remove} />
      <div className='flex gap-2 items-center bg-muted p-2 rounded focus-within:ring'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={open}
          title='Attach file'
        >
          <Paperclip className='w-4 h-4' />
        </Button>
        <Input
          placeholder='Message…'
          {...register("content")}
          className='flex-1 bg-transparent border-0 focus-visible:ring-0'
        />
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send"}
        </Button>
      </div>
    </form>
  )
}
