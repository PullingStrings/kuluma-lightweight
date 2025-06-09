// app/(dashboard)/workspaces/page.tsx
"use client" // now a client component
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth"
import api from "@/lib/api"

export default function WorkspacesRoot() {
  const router = useRouter()
  const { accessToken, hydrated } = useAuthStore()

  // wait until Zustand is hydrated; AuthBootstrap will have run
  useEffect(() => {
    if (!hydrated) return

    if (!accessToken) {
      router.replace("/login")
      return
    }

    ;(async () => {
      const { data: w } = await api.get("/api/workspaces")
      if (!w.length) {
        router.replace("/workspaces/none")
        return
      }
      const ws = w[0]
      const { data: ch } = await api.get(`/api/workspaces/${ws.id}/channels`)
      router.replace(
        ch.length
          ? `/workspaces/${ws.id}/channels/${ch[0].id}`
          : `/workspaces/${ws.id}`
      )
    })()
  }, [hydrated, accessToken, router])

  return null // blank splash while we decide
}
