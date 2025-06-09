"use client"

import { ReactNode, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { socket, connectSocket } from "@/lib/socket"
import { useAuthStore } from "@/lib/auth"
import { usePresenceStore } from "@/stores/presenceStore"

export default function SocketProvider({ children }: { children: ReactNode }) {
  const { accessToken } = useAuthStore()
  const [queryClient] = useState(() => new QueryClient())

  /** useEffect avoids “window is undefined” on the server */
  const [persister] = useState(() =>
    typeof window === "undefined"
      ? undefined
      : createSyncStoragePersister({
          storage: window.localStorage, // ⬅️  switch from indexedDB
          key: "kuluma-react-query", // optional: prefix
        })
  )

  useEffect(() => {
    if (accessToken) connectSocket()
    else socket.disconnect()
  }, [accessToken])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleNewMessage(msg: any) {
      const channelId = msg.channelId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["messages", channelId], (old: any[] = []) => [
        ...old,
        msg,
      ])
    }
    function handleUserStatus({
      userId,
      isOnline,
    }: {
      userId: string
      isOnline: boolean
    }) {
      usePresenceStore.getState().setOnline(userId, isOnline)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleUserTyping({ channelId, userId, isTyping }: any) {
      usePresenceStore.getState().setTyping(channelId, userId, isTyping)
      // auto‑clear after 3 s
      if (isTyping)
        setTimeout(
          () => usePresenceStore.getState().setTyping(channelId, userId, false),
          3000
        )
    }
    socket.on("new_message", handleNewMessage)
    socket.on("user_status", handleUserStatus)
    socket.on("user_typing", handleUserTyping)
    return () => {
      socket.off("new_message", handleNewMessage)
      socket.off("user_status", handleUserStatus)
      socket.off("user_typing", handleUserTyping)
    }
  }, [queryClient])

  return persister ? (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: { shouldDehydrateQuery: () => true },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  ) : (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
