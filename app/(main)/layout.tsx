import type React from "react"
import MouseMoveEffect from "@/components/mouse-move-effect"
import "./styles.css"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dark">
      <div className="bg-background text-foreground antialiased min-h-screen">
        <MouseMoveEffect />
        {children}
      </div>
    </div>
  )
}
