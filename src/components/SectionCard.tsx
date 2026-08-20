import type { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  children: ReactNode
  badge?: string
  icon?: ReactNode
}

export default function SectionCard({
  title,
  children,
  badge,
  icon,
}: SectionCardProps) {
  return (
    <div className="card-lift relative overflow-hidden rounded-xl border border-zinc-700/70 bg-[#161626] p-5 sm:p-6 transition-all duration-200 hover:border-zinc-600 hover:bg-[#1a1a2e]">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {icon && <div className="text-zig-orange">{icon}</div>}
          <h4 className="font-display text-base sm:text-lg font-semibold text-zinc-100">{title}</h4>
        </div>
        {badge && (
          <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
            {badge}
          </span>
        )}
      </div>
      <div className="text-sm leading-relaxed text-zinc-400 space-y-2">{children}</div>
    </div>
  )
}
