"use client"
import { useTheme } from "@/hooks/useTheme"
import { SunMedium, Moon, Laptop2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Theme = "light" | "dark" | "system"

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme()

  const icon =
    theme === "light" ? (
      <SunMedium className='w-4 h-4' />
    ) : theme === "dark" ? (
      <Moon className='w-4 h-4' />
    ) : (
      <Laptop2 className='w-4 h-4' />
    )

  const next = (t: Theme): Theme =>
    t === "light" ? "dark" : t === "dark" ? "system" : "light"

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(next(theme))}
      title={theme}
    >
      {icon}
    </Button>
  )
}
