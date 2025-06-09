"use client"
import { useUIStore } from "@/stores/uiStore"
import { Button } from "@/components/ui/button"
import ThemeToggle from "../common/ThemeToggle"

export default function TopBar() {
  const { toggleSidebar } = useUIStore()
  return (
    <header className='flex items-center gap-2 p-2 border-b lg:hidden justify-between'>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='icon' onClick={() => toggleSidebar(true)}>
          ☰
        </Button>
        <h1 className='font-semibold text-lg'>Kuluma</h1>
      </div>
      <ThemeToggle />
    </header>
  )
}
