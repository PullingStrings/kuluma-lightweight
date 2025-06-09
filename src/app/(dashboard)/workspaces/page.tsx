"use client"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { useRouter } from "next/navigation"
import { useUIStore } from "@/stores/uiStore"
import { Button } from "@/components/ui/button"

export default function WorkspacesListPage() {
  const router = useRouter()
  const { setWorkspace } = useUIStore()
  const { data: workspaces = [], isLoading } = useWorkspaces()

  if (isLoading) return <p className='p-4'>Loading…</p>

  if (workspaces.length === 0)
    return (
      <div className='p-6'>
        <h2 className='text-xl font-semibold mb-2'>No workspaces yet</h2>
        <p className='text-sm text-muted-foreground'>
          Ask for an invite or&nbsp;
          <button className='underline'>create a new workspace</button>.
        </p>
      </div>
    )

  return (
    <ul className='p-4 space-y-2'>
      {workspaces.map((w) => (
        <li key={w.id}>
          <Button
            variant='ghost'
            className='w-full justify-start'
            onClick={() => {
              setWorkspace(w.id)
              router.push(`/workspaces/${w.id}`) // this page will redirect to first channel
            }}
          >
            {w.name}
          </Button>
        </li>
      ))}
    </ul>
  )
}
