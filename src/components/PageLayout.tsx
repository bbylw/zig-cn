import type { ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  description?: string
  children: ReactNode
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-zig-border pb-6">
        <h1 className="animate-fade-up font-display text-3xl font-bold tracking-tight text-zig-text-bright sm:text-4xl" style={{ ['--index' as string]: 0 }}>
          {title}
        </h1>
        {description && (
          <p className="animate-fade-up mt-3 max-w-[55ch] text-lg leading-relaxed text-zig-text-muted" style={{ ['--index' as string]: 1 }}>
            {description}
          </p>
        )}
      </div>
      <div className="prose prose-invert max-w-none">{children}</div>
    </div>
  )
}
