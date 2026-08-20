import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import {
  BookOpen,
  Terminal,
  Search,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Globe,
} from 'lucide-react'

const docLinks = [
  {
    title: '语言官方参考手册 (LangRef)',
    desc: 'Zig 语言完整的权威参考，涵盖语法、类型系统、控制流、内存模型及编译期机制的详尽定义。',
    url: 'https://ziglang.org/documentation/master/',
    badge: '权威规范',
    icon: BookOpen,
  },
  {
    title: '标准库交互式文档 (zig std)',
    desc: '本地运行 zig std 或在线浏览 master 标准库 API。可实时模糊搜索所有模块、函数与结构体。',
    url: 'https://ziglang.org/documentation/master/std/',
    badge: 'API 检索',
    icon: Layers,
  },
  {
    title: '官方学习中心 (Learn Zig)',
    desc: '由浅入深的官方教程，从安装、Hello World 到高级编译系统构建。',
    url: 'https://ziglang.org/learn/',
    badge: '官方教程',
    icon: Sparkles,
  },
  {
    title: 'Zig Guide (社区精编指南)',
    desc: '社区广受好评的循序渐进结构化学习手册，适合初学者系统性入门。',
    url: 'https://zig.guide/',
    badge: '循序渐进',
    icon: Code2,
  },
  {
    title: 'Ziggit 社区论坛',
    desc: '全球 Zig 核心开发者与爱好者的问答讨论聚集地，遇到任何问题均可在此获得解答。',
    url: 'https://ziggit.dev/',
    badge: '问答交流',
    icon: Globe,
  },
  {
    title: 'Learning Zig (Karl Seguin)',
    desc: '高质量的实战手记，深入浅出讲解指针、内存分配器和惯用法。',
    url: 'https://www.openmymind.net/learning_zig/',
    badge: '实战心得',
    icon: Cpu,
  },
]

const commonCommands = [
  { cmd: 'zig init', desc: '在当前空目录下初始化全新的 Zig 项目骨架 (含 build.zig)', category: '项目' },
  { cmd: 'zig build', desc: '根据 build.zig 脚本编译构建整个项目', category: '构建' },
  { cmd: 'zig build run', desc: '编译并直接运行主程序产物', category: '运行' },
  { cmd: 'zig run <file.zig>', desc: '单文件快速编译并运行，适合算法与小脚本测试', category: '运行' },
  { cmd: 'zig test <file.zig>', desc: '运行指定文件或项目内的全部内联测试套件', category: '测试' },
  { cmd: 'zig fmt .', desc: '递归自动格式化当前目录下的所有 Zig 源码文件', category: '格式化' },
  { cmd: 'zig std', desc: '启动本地高性能 HTTP 服务，在浏览器打开交互式标准库文档', category: '文档' },
  { cmd: 'zig cc <file.c>', desc: '使用 Zig 作为零配置、全功能的现代 C 语言编译器', category: 'C/C++' },
  { cmd: 'zig c++ <file.cpp>', desc: '使用 Zig 作为现代 C++ 语言编译器', category: 'C/C++' },
  { cmd: 'zig translate-c <file.h>', desc: '自动将 C 头文件与源代码翻译为等效的 Zig 源代码', category: 'C/C++' },
  { cmd: 'zig targets', desc: '打印所有支持的 CPU 架构、OS 与 ABI 目标矩阵', category: '工具' },
  { cmd: 'zig zen', desc: '打印 Zig 语言设计核心禅语 (Zen of Zig)', category: '哲学' },
]

export default function Docs() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', '项目', '构建', '运行', '测试', '格式化', 'C/C++', '工具']

  const filteredCommands = commonCommands.filter((item) => {
    const matchCat = selectedCategory === '全部' || item.category === selectedCategory
    const matchText =
      item.cmd.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchText
  })

  return (
    <PageLayout
      title="文档、命令与生态资源"
      description="Zig 官方参考手册、交互式标准库检索、全套常用命令行速查与中文开发者学习路径。"
      badge="开发者速查"
    >
      {/* ── Official & Community Learning Grid ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            官方与社区学习资源
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docLinks.map((doc) => {
            const Icon = doc.icon
            return (
              <a
                key={doc.title}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group flex flex-col justify-between rounded-2xl border border-zinc-700/80 bg-[#161626] p-6 transition-all hover:border-zinc-500 hover:bg-[#1a1a2e]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zig-orange group-hover:bg-zig-orange group-hover:text-zinc-950 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                      {doc.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-zinc-100 mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{doc.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center text-xs font-semibold text-zig-orange group-hover:text-zig-orange-light">
                  <span>立即访问</span>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* ── Common Commands Reference (Interactive Filter) ── */}
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-zig-orange" />
            <h2 className="font-display text-2xl font-bold text-zinc-100">
              CLI 常用命令速查表
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="搜索命令 (如 fmt, cc, test)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:border-zig-orange focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-3 mb-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-zig-orange text-zinc-950 font-semibold shadow'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-zinc-700/80 bg-[#141422] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-zinc-800 bg-[#181828]">
                <tr>
                  <th className="px-5 py-3.5 font-bold text-zinc-200">命令行指令</th>
                  <th className="px-5 py-3.5 font-semibold text-zinc-300">分类</th>
                  <th className="px-5 py-3.5 font-semibold text-zinc-300">功能说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredCommands.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-zinc-500 text-xs">
                      没有匹配到任何相关命令。
                    </td>
                  </tr>
                ) : (
                  filteredCommands.map((item) => (
                    <tr key={item.cmd} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-amber-300 font-semibold whitespace-nowrap">
                        <code>{item.cmd}</code>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="rounded bg-zinc-800/80 px-2 py-0.5 font-mono text-[11px] text-zinc-400 border border-zinc-700/60">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-zinc-300 text-xs sm:text-sm">
                        {item.desc}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Zen of Zig ── */}
      <section className="mb-14">
        <div className="rounded-2xl border border-zinc-700 bg-gradient-to-br from-[#161626] to-[#12121e] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-zig-orange" />
            <h3 className="font-display text-xl font-bold text-zinc-100">
              Zen of Zig (Zig 语言设计禅语)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              • 没有任何隐式控制流 (No hidden control flow)
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              • 没有任何隐式内存分配 (No hidden memory allocations)
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              • 语言设计无垃圾回收机制 (No garbage collector)
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              • 能够与 C 语言无缝自由互操作 (C interop without FFI glue)
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              • 编译期与运行时采用同一种语法 (Comptime everywhere)
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              • 显式优于隐式，简单优于复杂 (Explicit is better than implicit)
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
