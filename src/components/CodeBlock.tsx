import { useState } from 'react'

interface CodeBlockProps {
  children: string
  lang?: string
  title?: string
}

export default function CodeBlock({ children, lang, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="group relative my-4">
      {title && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-zig-border bg-zig-bg-elevated px-4 py-2">
          <span className="font-mono text-xs text-zig-text-muted">{title}</span>
          {lang && (
            <span className="rounded bg-zig-orange/12 px-2 py-0.5 font-mono text-xs text-zig-orange-light">{lang}</span>
          )}
        </div>
      )}
      <div className={`relative ${title ? '' : 'rounded-lg border border-zig-border'} bg-zig-bg-elevated/50`}>
        {!title && lang && (
          <span className="absolute right-3 top-3 z-10 rounded bg-zig-orange/12 px-2 py-0.5 font-mono text-xs text-zig-orange-light opacity-0 transition-opacity group-hover:opacity-100">
            {lang}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="btn-tactile absolute right-3 top-3 z-10 flex items-center gap-1 rounded bg-zig-surface/80 px-2 py-1 font-mono text-xs text-zig-text-muted opacity-0 transition-opacity hover:text-zig-text-bright group-hover:opacity-100"
          aria-label="复制代码"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </>
          )}
        </button>
        <pre className={title ? 'rounded-t-none' : ''}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  )
}
