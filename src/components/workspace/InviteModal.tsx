"use client"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUserSearch } from "@/hooks/useUserSearch"
import { useAddWorkspaceUser } from "@/hooks/useAddWorkspaceUser"

interface InviteModalProps {
  avaterUrl?: string
  displayName?: string
  username?: string
  id?: string
}

export default function InviteModal({
  workspaceId,
  open,
  onOpenChange,
}: {
  workspaceId: string
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const [query, setQuery] = useState("")
  const { data: results = [], isFetching } = useUserSearch(query)
  const addMut = useAddWorkspaceUser(workspaceId)

  // console.log("results", results, "workspaceId", workspaceId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='DialogContent' aria-describedby='invite-modal'>
        <DialogTitle className='text-lg font-semibold'>Add people</DialogTitle>
        <Input
          placeholder='Search by username or email'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul className='max-h-60 overflow-y-auto space-y-1'>
          {isFetching && <li className='text-sm px-2 py-1'>Searching…</li>}
          {results.map((u: InviteModalProps) => (
            <li
              key={u.id}
              className='flex items-center justify-between px-2 py-1 hover:bg-muted rounded'
            >
              <span>{u.displayName || u.username}</span>
              <Button
                size='sm'
                onClick={() => u.id && addMut.mutate(u.id)}
                disabled={addMut.isPending}
              >
                Add
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
