import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface PageLayoutProps {
  title: string
  description: string
  children: ReactNode
  badge?: string
}

export default function PageLayout({
  title,
  description,
  children,
  badge,
}: PageLayoutProps) {
  return (
    <div className="relative pt-24 pb-20 overflow-hidden min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[450px] w-full max-w-7xl rounded-full bg-zig-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-zinc-400">
          <Link to="/" className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
            <Home className="h-3.5 w-3.5 text-zinc-500" />
            <span>首页</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
          <span className="text-zinc-200 font-medium">{title}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12 border-b border-zinc-800/80 pb-8">
          {badge && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zig-orange/30 bg-zig-orange/10 px-3 py-1 text-xs font-semibold text-zig-orange-light">
              <span className="h-1.5 w-1.5 rounded-full bg-zig-orange animate-pulse" />
              {badge}
            </div>
          )}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-3xl">
            {description}
          </p>
        </header>

        {/* Page Main Content */}
        <div className="space-y-12">{children}</div>
      </div>
    </div>
  )
}
