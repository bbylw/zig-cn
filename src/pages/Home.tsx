import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Zap,
  Cpu,
  Globe,
  Terminal,
  ArrowRight,
  Download,
  BookOpen,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
} from 'lucide-react'
import ZigCodePlayground from '../components/ZigCodePlayground'
import TargetCompilerExplorer from '../components/TargetCompilerExplorer'

const features = [
  {
    icon: ShieldCheck,
    title: '极其纯粹的健壮性 (Robustness)',
    desc: '没有隐藏的控制流、没有隐藏的内存分配、没有预处理器宏。错误处理是显式值，编译器严格强制你处理所有潜在失败路径。',
    badge: '显式设计',
    span: 'lg:col-span-2',
  },
  {
    icon: Zap,
    title: '最优性能 (Optimal)',
    desc: '直接与 C 竞争——零运行时开销，没有垃圾回收 (No GC)。生成的机器码媲美甚至超越手写 C 语言。',
    badge: '零抽象开销',
    span: 'lg:col-span-1',
  },
  {
    icon: Cpu,
    title: 'Comptime 编译期元编程',
    desc: 'comptime 关键字允许你在编译期直接执行普通 Zig 代码生成类型与逻辑。无需复杂的宏或抽象语法树转换。',
    badge: '一等公民类型',
    span: 'lg:col-span-1',
  },
  {
    icon: Globe,
    title: '开挂级交叉编译 (Cross-Compilation)',
    desc: '开箱即用的跨架构交叉编译。Zig 内置主流系统的 libc 支持与底层链接器，一行命令即可为 Windows, macOS, Linux, WASI 生成独立二进制。',
    badge: '自带全套 libc',
    span: 'lg:col-span-2',
  },
]

const comparisonData = [
  {
    feature: '内存安全哲学',
    zig: '显式分配器 + 运行时边界与溢出检查 + defer',
    c: '手动管理，无内置越界/未定义行为保护',
    cpp: 'RAII + 智能指针 (复杂的所有权隐式调用)',
    rust: '编译期 Borrow Checker (所有权与生命周期标注)',
  },
  {
    feature: '元编程能力',
    zig: 'comptime (在编译期直接运行常规 Zig 代码)',
    c: '文本预处理器宏 (#define / #ifdef)',
    cpp: '模板元编程 (Templates / SFINAE / Concepts)',
    rust: '声明式与过程式宏 (Macro 语法扩展)',
  },
  {
    feature: 'C 语言互操作',
    zig: '原生 @cImport 直接解析 C 头文件，并作为 C 编译器',
    c: '原生',
    cpp: 'extern "C" 兼容',
    rust: '通过 bindgen / FFI 胶水代码与 unsafe 块',
  },
  {
    feature: '交叉编译体验',
    zig: '开箱即用，自带所有目标平台的 libc 和链接器',
    c: '需费力安装对应 target 的交叉编译工具链',
    cpp: '极为复杂，依赖多套系统库与 sysroot',
    rust: '需 rustup target add，且仍依赖外部 C 链接器',
  },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Ambient lighting glows */}
        <div className="absolute left-1/2 top-10 -z-10 -translate-x-1/2 h-[550px] w-full max-w-7xl rounded-full bg-gradient-to-b from-zig-orange/15 via-amber-500/5 to-transparent blur-[130px] pointer-events-none" />
        <div className="absolute right-0 top-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zig-orange/30 bg-zig-orange/10 px-4 py-1.5 text-xs font-semibold text-zinc-100 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zig-orange opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zig-orange" />
              </span>
              <span>Zig 0.14+ 现代通用系统级编程语言及工具链</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-8 font-display text-5xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl">
              编写<span className="text-zig-orange">健壮</span>、
              <span className="text-zig-orange-light">最优</span>
              <br />
              且<span className="text-amber-400">可复用</span>软件的正确方式
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-zinc-400 max-w-3xl mx-auto">
              Zig 是一种通用的编程语言和用于维护健壮、最优且可复用软件的工具链。
              <strong className="text-zinc-200"> 没有隐藏的控制流</strong>、
              <strong className="text-zinc-200"> 没有隐藏的内存分配</strong>、
              <strong className="text-zinc-200"> 没有垃圾回收</strong>——赋予程序员最纯粹、最可靠的掌控力。
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/install"
                className="btn-tactile flex items-center gap-2 rounded-xl bg-zig-orange px-8 py-4 text-sm font-bold text-zinc-950 shadow-xl shadow-zig-orange/20 transition-all hover:bg-zig-orange-light hover:scale-105 active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>获取 Zig 工具链 (v0.14)</span>
              </Link>
              <Link
                to="/docs"
                className="btn-tactile flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-8 py-4 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
              >
                <BookOpen className="h-4 w-4 text-zig-orange" />
                <span>查阅中文文档与速查</span>
              </Link>
            </div>

            {/* Quick Feature stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>零运行时隐式调用</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>完整 C/C++ 编译器替代品</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>单二进制绿色分发</span>
              </div>
            </div>
          </div>

          {/* Interactive Code Playground */}
          <div className="mt-16">
            <ZigCodePlayground />
          </div>
        </div>
      </section>

      {/* ── Features Bento Grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-zig-orange" />
            核心设计哲学
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            为什么越来越多系统工程师选择 Zig？
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            每一个设计决策都聚焦于一个目标：消除任何让人意外的隐藏行为，让代码的运行逻辑 100% 清晰可预测。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`card-lift group relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-[#161626] p-7 transition-all hover:border-zinc-500 hover:bg-[#1a1a2e] ${feature.span}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zig-orange/10 text-zig-orange transition-colors group-hover:bg-zig-orange/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-zinc-800/80 px-3 py-1 font-mono text-xs font-semibold text-zinc-300 border border-zinc-700/60">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Interactive Target Compiler Explorer ── */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <TargetCompilerExplorer />
      </section>

      {/* ── Deep Comparison Table (Zig vs C vs C++ vs Rust) ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-300 mb-3">
            <Layers className="h-3.5 w-3.5 text-zig-orange" />
            横向对比
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Zig 与其他系统编程语言的哲学差异
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            理解 Zig 在语言谱系中的精准定位：比 C 更安全更现代化，比 C++ / Rust 更简洁直观。
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-700/80 bg-[#141422] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-zinc-800 bg-[#181828]">
                <tr>
                  <th className="px-5 py-4 font-bold text-zinc-200">维度 / 特性</th>
                  <th className="px-5 py-4 font-bold text-zig-orange bg-zig-orange/10">
                    ⚡ Zig (本语言)
                  </th>
                  <th className="px-5 py-4 font-semibold text-zinc-300">C 语言</th>
                  <th className="px-5 py-4 font-semibold text-zinc-300">C++</th>
                  <th className="px-5 py-4 font-semibold text-zinc-300">Rust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-5 py-4 font-semibold text-zinc-200 whitespace-nowrap">
                      {row.feature}
                    </td>
                    <td className="px-5 py-4 font-medium text-emerald-300 bg-zig-orange/5">
                      {row.zig}
                    </td>
                    <td className="px-5 py-4 text-zinc-400">{row.c}</td>
                    <td className="px-5 py-4 text-zinc-400">{row.cpp}</td>
                    <td className="px-5 py-4 text-zinc-400">{row.rust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Quick Nav Hub & Cards ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main big Card (7 cols) */}
          <Link
            to="/install"
            className="card-lift group relative overflow-hidden rounded-2xl border border-zinc-700 bg-[#161626] p-8 lg:col-span-7 transition-all hover:border-zinc-500 hover:bg-[#1a1a2e]"
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-zig-orange/10 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zig-orange/10 text-zig-orange">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
                获取 Zig 编译器与工具链
              </h3>
              <p className="mt-3 max-w-[48ch] text-sm sm:text-base leading-relaxed text-zinc-400">
                支持全平台预编译单二进制包：macOS（Apple Silicon / Intel）、Linux（x86_64、aarch64、riscv64）及 Windows。解压即用，无需任何繁琐全局安装。
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-zig-orange transition-transform group-hover:translate-x-1">
                <span>进入安装向导与包管理器指令</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Right column (5 cols stacked) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Link
              to="/build"
              className="card-lift group rounded-2xl border border-zinc-700 bg-[#161626] p-6 transition-all hover:border-zinc-500 hover:bg-[#1a1a2e]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zig-orange">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-zinc-100">
                    从源码编译 Zig 编译器
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                    包含标准 CMake + Ninja、使用预构建 Zig 以及不使用 LLVM 的轻量 bootstrap 编译方法。
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/contribute"
              className="card-lift group rounded-2xl border border-zinc-700 bg-[#161626] p-6 transition-all hover:border-zinc-500 hover:bg-[#1a1a2e]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zig-orange">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-zinc-100">
                    参与 Zig 社区与开源贡献
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                    了解贡献者友好的 Issue 标签、测试套件运行方式以及 Zig 软件基金会捐助渠道。
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Call to Action Banner ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-700 bg-gradient-to-br from-[#18182a] via-[#141422] to-[#0f0f18] p-10 sm:p-16 shadow-2xl">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-zig-orange/15 blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold text-zinc-100 sm:text-4xl">
              开启全新的系统编程体验
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              拥抱没有未定义行为折磨、没有隐式开销陷阱的现代编程语言。加入全球不断壮大的 Zig 开发者生态。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://ziglang.org/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile flex items-center gap-2 rounded-xl bg-zig-orange px-8 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-zig-orange/20 transition-all hover:bg-zig-orange-light"
              >
                <Download className="h-4 w-4" />
                <span>下载 Zig 0.14 稳定版</span>
              </a>
              <a
                href="https://ziggit.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-8 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-500 hover:text-white"
              >
                <span>访问 Ziggit 社区论坛 ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
