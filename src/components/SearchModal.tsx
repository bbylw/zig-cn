import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, BookOpen, Terminal, Download, Wrench, Sparkles, ArrowRight } from 'lucide-react'

interface SearchItem {
  title: string
  desc: string
  category: '指南' | '命令' | '构建' | '文档'
  path: string
  icon: typeof BookOpen
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    title: 'Zig 0.14.0 安装与下载',
    desc: '官方预编译包与各大包管理器快速安装',
    category: '指南',
    path: '/install',
    icon: Download,
  },
  {
    title: '常用命令速查 (zig init, run, test, fmt)',
    desc: '最常用的 Zig 编译器与构建命令行指令',
    category: '命令',
    path: '/docs',
    icon: Terminal,
  },
  {
    title: '从源码构建 Zig (CMake + Ninja)',
    desc: '全平台编译编译器自身，含 LLVM 与无 LLVM 模式',
    category: '构建',
    path: '/build',
    icon: Wrench,
  },
  {
    title: '语言核心哲学与设计理念',
    desc: '没有隐藏的控制流、没有隐藏的内存分配、comptime 元编程',
    category: '文档',
    path: '/',
    icon: Sparkles,
  },
  {
    title: '无 LLVM 轻量级 Bootstrap 构建',
    desc: '只需一个系统 C 编译器即可引导 stage2 编译器',
    category: '构建',
    path: '/build',
    icon: Wrench,
  },
  {
    title: 'Windows 平台编译指南',
    desc: '使用 MSVC 或 Windows DevKit 构建 Zig 编译器',
    category: '构建',
    path: '/build',
    icon: Wrench,
  },
  {
    title: '参与开源贡献指南',
    desc: '如何提交 PR、测试套件与 LLM 政策',
    category: '指南',
    path: '/contribute',
    icon: BookOpen,
  },
  {
    title: '标准库与本地文档 (zig std)',
    desc: '本地启动交互式、可搜索的单页标准库文档',
    category: '文档',
    path: '/docs',
    icon: Terminal,
  },
  {
    title: 'C/C++ 代码无缝互操作 (@cImport 与 zig cc)',
    desc: '用 Zig 替换 GCC/Clang 编译 C 语言代码',
    category: '命令',
    path: '/',
    icon: Terminal,
  },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (item: SearchItem) => {
    navigate(item.path)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/75 backdrop-blur-md">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-700/80 bg-[#151522] shadow-2xl transition-all">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3.5 sm:px-5">
          <Search className="h-5 w-5 text-zig-orange shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索文档、安装命令、构建指南、语言特性 (例如: install, fmt, llvm, std)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-500 hover:text-zinc-300">
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-zinc-500">
              未找到与 "{query}" 相关的内容，请尝试其他关键词。
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-all ${
                    isSelected
                      ? 'bg-zig-orange/15 border border-zig-orange/30'
                      : 'hover:bg-zinc-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? 'bg-zig-orange text-zinc-950'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-zinc-100 text-sm truncate">
                          {item.title}
                        </span>
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? 'text-zig-orange translate-x-1' : 'text-zinc-600'
                    }`}
                  />
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-zinc-800 bg-[#12121c] px-4 py-2.5 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 text-[10px]">↑</kbd>{' '}
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 text-[10px]">↓</kbd>{' '}
              选择
            </span>
            <span>
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 text-[10px]">↵</kbd>{' '}
              进入
            </span>
          </div>
          <span className="text-zinc-400 font-mono text-[11px]">Zig 官方中文资源索引</span>
        </div>
      </div>
    </div>
  )
}
