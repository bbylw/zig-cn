import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, Menu, X, Terminal, Download, Wrench, Users, BookOpen } from 'lucide-react'
import ZigLogo from './ZigLogo'
import SearchModal from './SearchModal'

const navItems = [
  { path: '/', label: '首页', icon: SparklesIcon },
  { path: '/install', label: '下载与安装', icon: Download },
  { path: '/build', label: '从源码构建', icon: Wrench },
  { path: '/contribute', label: '参与贡献', icon: Users },
  { path: '/docs', label: '文档与资源', icon: BookOpen },
]

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Hotkey listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/80 bg-[#11111a]/85 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-transform active:scale-95"
            onClick={() => setMobileOpen(false)}
          >
            <ZigLogo size={32} glow />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-display text-lg font-bold tracking-tight text-zinc-100">
                <span>Zig</span>
                <span className="text-zig-orange">中文社区</span>
                <span className="rounded bg-zig-orange/15 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-zig-orange-light border border-zig-orange/30">
                  0.14
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn-tactile relative rounded-xl px-3.5 py-2 text-sm font-medium transition-all ${
                    active
                      ? 'bg-zig-orange/15 text-zig-orange font-semibold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-zig-orange shadow-sm shadow-zig-orange" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Action Utilities (Search, Repo, Community) */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-zinc-800/60 px-3 py-1.5 text-xs text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200"
              title="全局搜索 (快捷键 ⌘K)"
            >
              <Search className="h-3.5 w-3.5 text-zig-orange" />
              <span className="hidden sm:inline">搜索...</span>
              <kbd className="hidden sm:inline-block rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.2 text-[10px] font-mono text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Codeberg / GitHub Link */}
            <a
              href="https://codeberg.org/ziglang/zig"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
              title="Zig 官方 Codeberg 源码仓库"
            >
              <Terminal className="h-3.5 w-3.5 text-zig-orange" />
              <span>Codeberg</span>
            </a>

            {/* Official Website */}
            <a
              href="https://ziglang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-zig-orange/30 bg-zig-orange/10 px-3 py-1.5 text-xs font-semibold text-zig-orange-light transition-all hover:bg-zig-orange/20"
            >
              <span>ziglang.org</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="切换导航菜单"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-t border-zinc-800 bg-[#141422] px-4 py-4 md:hidden shadow-2xl animate-fade-up">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? 'bg-zig-orange/15 text-zig-orange font-semibold border border-zig-orange/30'
                        : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-zinc-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zig-orange" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-2">
              <a
                href="https://ziglang.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 py-2 text-xs font-semibold text-zinc-200"
              >
                <span>官方主站</span>
              </a>
              <a
                href="https://codeberg.org/ziglang/zig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 py-2 text-xs font-semibold text-zinc-200"
              >
                <span>Codeberg 仓库</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
