"use client"
import { useAuthStore } from "@/lib/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function Root() {
  const router = useRouter()
  const { accessToken } = useAuthStore()

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login")
      return
    }
    ;(async () => {
      try {
        const { data: workspaces } = await api.get("/api/workspaces")
        if (!workspaces.length) {
          router.replace("/workspaces/none")
          return
        }
        const ws = workspaces[0]
        const { data: channels } = await api.get(
          `/api/workspaces/${ws.id}/channels`
        )
        if (!channels.length) {
          router.replace(`/workspaces/${ws.id}`)
          return
        }
        router.replace(`/workspaces/${ws.id}/channels/${channels[0].id}`)
      } catch {
        router.replace("/login")
      }
    })()
  }, [accessToken, router])

  return null // blank while redirecting
}
