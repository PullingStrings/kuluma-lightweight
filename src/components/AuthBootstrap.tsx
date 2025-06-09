"use client"
import { useEffect, useRef } from "react"
import { useAuthStore } from "@/lib/auth"
import api from "@/lib/api"
import { socket } from "@/lib/socket"

export default function AuthBootstrap() {
  const { accessToken, setSession, clear } = useAuthStore()
  const tried = useRef(false)

  useEffect(() => {
    if (accessToken || tried.current) return

    // 🍪 1️⃣ Only attempt if cookie exists
    if (!document.cookie.includes("kuluma_rt=")) {
      tried.current = true
      return // no cookie ⇒ stay logged‑out
    }

    tried.current = true
    ;(async () => {
      try {
        const { data } = await api.post("/api/auth/refresh")
        setSession(data.accessToken, data.user)
        socket.auth = { token: data.accessToken }
        socket.connect()
      } catch {
        clear() // cookie expired ⇒ stay logged‑out
      }
    })()
  }, [accessToken, setSession, clear])

  return null
}
