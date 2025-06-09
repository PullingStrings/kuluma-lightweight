"use client"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { useChannels } from "@/hooks/useChannels"
import { useUIStore } from "@/stores/uiStore"
// import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import InviteModal from "@/components/workspace/InviteModal"
import { Fragment, useState } from "react"
import { Dialog, DialogContent } from "@radix-ui/react-dialog"
import Image from "next/image"
import clsx from "clsx"
import Link from "next/link"

export default function WorkspaceSidebar() {
  // const router = useRouter()
  const {
    currentWorkspaceId,
    currentChannelId,
    setWorkspace,
    setChannel,
    isSidebarOpen,
    toggleSidebar,
  } = useUIStore()

  const { data: workspaces = [], isLoading: wLoading } = useWorkspaces()
  const { data: channels = [], isLoading: cLoading } =
    useChannels(currentWorkspaceId)

  const [inviteOpen, setInviteOpen] = useState(false)

  const content = (
    <aside className='w-60 shrink-0 border-r bg-muted h-full flex flex-col'>
      <header className='p-4 font-semibold flex justify-between items-center'>
        Kuluma
        <Button
          variant='ghost'
          size='icon'
          className='lg:hidden'
          onClick={() => toggleSidebar(false)}
        >
          ✕
        </Button>
      </header>
      {currentWorkspaceId && (
        <>
          <Button
            size='sm'
            variant='outline'
            onClick={() => setInviteOpen(true)}
          >
            + Add people
          </Button>
          <InviteModal
            workspaceId={currentWorkspaceId}
            open={inviteOpen}
            onOpenChange={setInviteOpen}
          />
        </>
      )}
      <div className='flex-1 overflow-y-auto px-2'>
        {wLoading ? (
          <p className='p-2 text-sm'>Loading workspaces…</p>
        ) : workspaces.length === 0 ? (
          <p className='p-2 text-sm italic'>No workspaces yet</p>
        ) : (
          workspaces.map((w) => (
            <Fragment key={w.id}>
              <Link
                href={`/workspaces/${w.id}`}
                className={clsx(
                  "w-full text-left px-3 py-2 rounded hover:bg-muted-foreground/10",
                  currentWorkspaceId === w.id && "bg-primary/10 font-medium"
                )}
                onClick={() => {
                  setWorkspace(w.id)
                  setChannel(channels[0]?.id ?? "") // reset channel
                  toggleSidebar(false)
                }}
              >
                {w.avatarUrl ? (
                  <Image
                    width={20}
                    height={20}
                    alt='avatar'
                    src={w.avatarUrl}
                    className='inline-block w-5 h-5 rounded mr-2'
                  />
                ) : (
                  <span className='inline-block w-5 h-5 rounded bg-primary/20 mr-2' />
                )}
                {w.name}
              </Link>
              {currentWorkspaceId === w.id && (
                <div className='pl-8'>
                  {cLoading ? (
                    <p className='text-xs py-1'>Loading…</p>
                  ) : channels.length === 0 ? (
                    <p className='text-xs py-1 italic'>No channels</p>
                  ) : (
                    channels.map((c) => (
                      <Link
                        href={`/workspaces/${w.id}/channels/${c.id}`}
                        key={c.id}
                        className={clsx(
                          "block w-full text-left px-2 py-1 rounded hover:bg-muted-foreground/10 text-sm",
                          currentChannelId === c.id &&
                            "bg-primary/10 font-medium"
                        )}
                        onClick={() => {
                          setChannel(c.id)
                          // router.push(`/workspaces/${w.id}/channels/${c.id}`)
                          toggleSidebar(false)
                        }}
                      >
                        {c.isPrivate ? "🔒 " : "# "} {c.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </Fragment>
          ))
        )}
      </div>
    </aside>
  )

  // lg+: static; mobile: Radix Dialog sheet
  return (
    <>
      <div className='hidden lg:block h-full'>{content}</div>
      <Dialog open={isSidebarOpen} onOpenChange={(v) => toggleSidebar(v)}>
        <DialogContent className='p-0 w-60 h-full fixed left-0 top-0'>
          {content}
        </DialogContent>
      </Dialog>
    </>
  )
}
