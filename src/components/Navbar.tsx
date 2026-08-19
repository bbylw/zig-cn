import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { path: '/', label: '首页' },
  { path: '/install', label: '安装' },
  { path: '/build', label: '从源码构建' },
  { path: '/contribute', label: '贡献' },
  { path: '/docs', label: '文档' },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zig-border bg-zig-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="text-2xl font-bold text-zig-orange">Z</span>
          <span className="font-display text-lg font-semibold text-zig-text-bright">
            Zig<span className="text-zig-orange">中文</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`btn-tactile rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-zig-orange/12 text-zig-orange-light'
                  : 'text-zig-text-muted hover:bg-zig-surface hover:text-zig-text-bright'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://ziglang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile ml-2 rounded-lg border border-zig-border px-4 py-2 text-sm font-medium text-zig-text-muted transition-colors hover:border-zig-orange/50 hover:text-zig-orange"
          >
            官网 ↗
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="btn-tactile rounded-lg p-2 text-zig-text-muted hover:bg-zig-surface hover:text-zig-text-bright md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="切换菜单"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-zig-border px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-zig-orange/12 text-zig-orange-light'
                  : 'text-zig-text-muted hover:bg-zig-surface hover:text-zig-text-bright'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://ziglang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-zig-text-muted hover:bg-zig-surface hover:text-zig-text-bright"
          >
            官网 ↗
          </a>
        </div>
      )}
    </nav>
  )
}
