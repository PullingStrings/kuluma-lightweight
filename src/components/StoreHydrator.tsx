// components/StoreHydrator.tsx
"use client"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth"

export default function StoreHydrator() {
  const setHydrated = useAuthStore((s) => s.setHydrated)

  useEffect(() => {
    setHydrated() // runs exactly once after first client render
  }, [setHydrated])

  return null
}
