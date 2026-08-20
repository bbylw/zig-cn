import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

interface CodeBlockProps {
  children: string
  lang?: string
  title?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

// Lightweight syntax highlighter for Zig and shell
function formatSyntax(code: string, lang?: string) {
  if (!lang || (lang !== 'zig' && lang !== 'sh' && lang !== 'bash' && lang !== 'c' && lang !== 'bat')) {
    return <span>{code}</span>
  }

  const lines = code.split('\n')
  return (
    <>
      {lines.map((line, idx) => {
        let formatted = <>{line}</>

        if (lang === 'zig' || lang === 'c') {
          // Tokenize simple keywords, strings, comments
          const isComment = line.trim().startsWith('//')
          if (isComment) {
            formatted = <span className="text-zinc-500 italic">{line}</span>
          } else {
            // Regex replacements for keywords, builtins, strings
            const tokens = line.split(/(\/\/[^\n]*|".*?"|@[a-zA-Z0-9_]+|\b(?:const|var|pub|fn|try|catch|defer|errdefer|if|else|switch|while|for|return|unreachable|comptime|inline|extern|export|packed|align|struct|enum|union|error|test|anytype|void|bool|u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|isize|f32|f64)\b)/g)

            formatted = (
              <>
                {tokens.map((tok, tIdx) => {
                  if (tok.startsWith('//')) {
                    return <span key={tIdx} className="text-zinc-500 italic">{tok}</span>
                  }
                  if (tok.startsWith('"') && tok.endsWith('"')) {
                    return <span key={tIdx} className="text-emerald-400">{tok}</span>
                  }
                  if (tok.startsWith('@')) {
                    return <span key={tIdx} className="text-purple-400 font-medium">{tok}</span>
                  }
                  if (/^(const|var|pub|fn|try|catch|defer|errdefer|if|else|switch|while|for|return|unreachable|comptime|inline|extern|export|packed|struct|enum|union|error|test)$/.test(tok)) {
                    return <span key={tIdx} className="text-zig-orange-light font-semibold">{tok}</span>
                  }
                  if (/^(anytype|void|bool|u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|isize|f32|f64)$/.test(tok)) {
                    return <span key={tIdx} className="text-cyan-400 font-medium">{tok}</span>
                  }
                  return <span key={tIdx}>{tok}</span>
                })}
              </>
            )
          }
        } else if (lang === 'sh' || lang === 'bash' || lang === 'bat') {
          const isComment = line.trim().startsWith('#') || line.trim().startsWith('REM')
          if (isComment) {
            formatted = <span className="text-zinc-500 italic">{line}</span>
          } else {
            const tokens = line.split(/(\b(?:zig|cmake|ninja|brew|sudo|pacman|dnf|pkg|nix-env|mkdir|cd|git|make|msbuild|set)\b|-[a-zA-Z0-9_-]+|"[^"]*")/g)
            formatted = (
              <>
                {tokens.map((tok, tIdx) => {
                  if (/^(zig|cmake|ninja|brew|sudo|pacman|dnf|pkg|nix-env|mkdir|cd|git|make|msbuild|set)$/.test(tok)) {
                    return <span key={tIdx} className="text-amber-400 font-semibold">{tok}</span>
                  }
                  if (tok.startsWith('-')) {
                    return <span key={tIdx} className="text-cyan-300">{tok}</span>
                  }
                  if (tok.startsWith('"') && tok.endsWith('"')) {
                    return <span key={tIdx} className="text-emerald-300">{tok}</span>
                  }
                  return <span key={tIdx}>{tok}</span>
                })}
              </>
            )
          }
        }

        return (
          <div key={idx} className="table-row leading-relaxed">
            <span className="table-cell select-none pr-4 text-right font-mono text-xs text-zinc-600">
              {idx + 1}
            </span>
            <span className="table-cell whitespace-pre font-mono text-xs sm:text-[13px] text-zinc-200">
              {formatted}
            </span>
          </div>
        )
      })}
    </>
  )
}

export default function CodeBlock({
  children,
  lang,
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const cleanLang = lang || 'text'
  const isMultiLine = children.trim().includes('\n')
  const shouldShowNumbers = showLineNumbers || (isMultiLine && cleanLang === 'zig')

  return (
    <div className="group relative my-3 overflow-hidden rounded-xl border border-zig-border bg-zig-bg-elevated shadow-lg transition-all duration-200 hover:border-zinc-700">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zig-border/60 bg-[#161622] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>
          {title ? (
            <span className="ml-2 font-mono text-xs font-medium text-zinc-300">{title}</span>
          ) : (
            <div className="ml-2 flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
              <Terminal className="h-3.5 w-3.5 text-zig-orange" />
              <span>{cleanLang.toUpperCase()}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {cleanLang && (
            <span className="rounded-md border border-zig-orange/20 bg-zig-orange/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-zig-orange-light">
              {cleanLang}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md border border-zinc-700/60 bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-all hover:border-zig-orange/50 hover:bg-zinc-700 hover:text-white active:scale-95"
            title="复制代码"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-[11px]">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span className="font-mono text-[11px]">复制</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code contents */}
      <div className="relative overflow-x-auto p-4 bg-[#12121c] font-mono">
        {shouldShowNumbers ? (
          <div className="table w-full">{formatSyntax(children.trimEnd(), cleanLang)}</div>
        ) : (
          <pre className="!m-0 !p-0 !bg-transparent !border-0 !text-inherit">
            <code>{formatSyntax(children.trimEnd(), cleanLang)}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
