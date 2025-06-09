import { ReactNode } from "react"
import AuthGuard from "@/components/AuthGuard"
import SocketProvider from "@/components/SocketProvider"
import WorkspaceSidebar from "@/components/navigation/WorkspaceSidebar"
import TopBar from "@/components/navigation/TopBar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <SocketProvider>
        <div className='flex h-screen'>
          <WorkspaceSidebar />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <TopBar />
            <main className='flex-1 overflow-hidden'>{children}</main>
          </div>
        </div>
      </SocketProvider>
    </AuthGuard>
  )
}
