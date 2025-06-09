"use client"

import { ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/auth"

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const { accessToken, hydrated } = useAuthStore()

  /* ── side‑effect: redirect (runs _after_ first paint) ─────────── */
  useEffect(() => {
    if (!hydrated) return // wait until zustand ready

    const hasCookie = document.cookie
      .split("; ")
      .some((c) => c.startsWith("kuluma_rt="))

    if (!accessToken && !hasCookie) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
    }
    // if !accessToken but cookie _is_ present, AuthBootstrap will refresh.
  }, [hydrated, accessToken, pathname, router])

  /* ── render ───────────────────────────────────────────────────── */
  if (!hydrated) return null // store not ready yet

  // while cookie exists but token hasn't been refreshed, show nothing
  const cookiePresent =
    typeof document !== "undefined" &&
    document.cookie.split("; ").some((c) => c.startsWith("kuluma_rt="))

  if (!accessToken && cookiePresent) return null // waiting for /refresh
  if (!accessToken) return null // redirected in effect

  return <>{children}</>
}
