import type { ReactNode } from 'react'

interface SectionCardProps {
  icon?: ReactNode
  title: string
  children: ReactNode
}

export default function SectionCard({ icon, title, children }: SectionCardProps) {
  return (
    <div className="card-lift rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-colors hover:border-zig-orange/30">
      {icon && <div className="mb-4 text-zig-orange">{icon}</div>}
      <h3 className="mb-2 font-display text-lg font-semibold text-zig-text-bright">{title}</h3>
      <div className="text-sm leading-relaxed text-zig-text-muted">{children}</div>
    </div>
  )
}
