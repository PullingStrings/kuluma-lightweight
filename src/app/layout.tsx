import "@/styles/globals.css"
import { ReactNode } from "react"
import { Inter } from "next/font/google"
import AuthBootstrap from "@/components/AuthBootstrap"
import StoreHydrator from "@/components/StoreHydrator"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} min-h-screen bg-background antialiased`}
      >
        <StoreHydrator />
        <AuthBootstrap />
        {children}
      </body>
    </html>
  )
}
