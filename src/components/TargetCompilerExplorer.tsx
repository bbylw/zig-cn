import { useState } from 'react'
import { Check, Copy, Globe, Terminal, ArrowRight, Cpu, Layers } from 'lucide-react'

const ARCHITECTURES = [
  { id: 'x86_64', label: 'x86_64 (64-bit Intel/AMD)' },
  { id: 'aarch64', label: 'aarch64 / ARM64 (Apple Silicon / Raspberry Pi 4/5)' },
  { id: 'riscv64', label: 'riscv64 (RISC-V 64-bit)' },
  { id: 'wasm32', label: 'wasm32 (WebAssembly)' },
  { id: 'arm', label: 'arm (ARM 32-bit Cortex-M)' },
  { id: 'x86', label: 'x86 (32-bit Legacy)' },
]

const OS_TARGETS = [
  { id: 'linux-gnu', label: 'Linux (GNU glibc)', desc: '兼容 Ubuntu, Debian, RHEL' },
  { id: 'linux-musl', label: 'Linux (musl libc 静态无依赖)', desc: '兼容 Alpine Linux，生成极小单二进制' },
  { id: 'windows-gnu', label: 'Windows (MinGW/GNU)', desc: '零外部依赖生成 .exe' },
  { id: 'macos', label: 'macOS (Darwin)', desc: '兼容 macOS 11.0+' },
  { id: 'wasi', label: 'WASI (WebAssembly System Interface)', desc: '云原生与浏览器沙盒运行时' },
  { id: 'freebsd', label: 'FreeBSD', desc: 'BSD 系列 Unix 操作系统' },
]

const OPTIMIZATIONS = [
  { id: 'Debug', label: 'Debug (快速构建，全面安全检查)' },
  { id: 'ReleaseSafe', label: 'ReleaseSafe (优化速度 + 保留安全检查)' },
  { id: 'ReleaseFast', label: 'ReleaseFast (极限优化，禁用安全检查)' },
  { id: 'ReleaseSmall', label: 'ReleaseSmall (极限缩小二进制尺寸)' },
]

export default function TargetCompilerExplorer() {
  const [arch, setArch] = useState('aarch64')
  const [os, setOs] = useState('linux-musl')
  const [opt, setOpt] = useState('ReleaseSafe')
  const [isCMode, setIsCMode] = useState(false)
  const [copied, setCopied] = useState(false)

  const targetTriple = `${arch}-${os}`

  const generatedCommand = isCMode
    ? `zig cc -target ${targetTriple} -O${opt === 'ReleaseSmall' ? 's' : opt === 'ReleaseFast' ? '3' : '2'} main.c -o my_app`
    : `zig build-exe main.zig -target ${targetTriple} -Doptimize=${opt}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-zinc-700/70 bg-zig-surface/50 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zig-orange/30 bg-zig-orange/10 px-3 py-1 text-xs font-semibold text-zig-orange-light mb-2">
            <Globe className="h-3.5 w-3.5" />
            开箱即用的开挂级交叉编译
          </div>
          <h3 className="font-display text-2xl font-bold text-zig-text-bright">
            目标架构交叉编译交互配置器
          </h3>
          <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
            Zig 内置了所有主流平台的 libc 头文件与交叉工具链。无论你当前是在 macOS、Windows 还是 Linux 上，都可以在 1 秒内为任意目标平台生成原生二进制文件。
          </p>
        </div>

        {/* C compiler toggle */}
        <div className="flex items-center gap-2 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 self-start lg:self-auto">
          <button
            onClick={() => setIsCMode(false)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              !isCMode
                ? 'bg-zig-orange text-zinc-950 font-semibold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Zig 源码编译
          </button>
          <button
            onClick={() => setIsCMode(true)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              isCMode
                ? 'bg-zig-orange text-zinc-950 font-semibold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            C/C++ 代码编译 (zig cc)
          </button>
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-zinc-800">
        {/* Arch */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-zig-orange" />
            1. 选择目标 CPU 架构 (Arch)
          </label>
          <select
            value={arch}
            onChange={(e) => setArch(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-200 focus:border-zig-orange focus:outline-none focus:ring-1 focus:ring-zig-orange"
          >
            {ARCHITECTURES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        {/* OS */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            2. 选择目标操作系统与环境 (OS/ABI)
          </label>
          <select
            value={os}
            onChange={(e) => setOs(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-200 focus:border-zig-orange focus:outline-none focus:ring-1 focus:ring-zig-orange"
          >
            {OS_TARGETS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Opt */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            3. 选择优化模式 (Optimization)
          </label>
          <select
            value={opt}
            onChange={(e) => setOpt(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-200 focus:border-zig-orange focus:outline-none focus:ring-1 focus:ring-zig-orange"
          >
            {OPTIMIZATIONS.map((op) => (
              <option key={op.id} value={op.id}>
                {op.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Generated output box */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-zig-orange" />
            生成的跨平台一键编译命令：
          </span>
          <span className="text-xs font-mono text-emerald-400">
            Target Triple: <code className="text-zig-orange font-bold">{targetTriple}</code>
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-[#0e0e17] p-4">
          <code className="font-mono text-xs sm:text-sm text-amber-300 overflow-x-auto whitespace-nowrap flex-1">
            $ {generatedCommand}
          </code>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>复制命令</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <ArrowRight className="h-3 w-3 text-zig-orange" />
            无需安装对应平台的 GCC/Clang 工具链
          </span>
          <span className="flex items-center gap-1">
            <ArrowRight className="h-3 w-3 text-zig-orange" />
            无需下载虚拟机或 Docker 容器
          </span>
          <span className="flex items-center gap-1">
            <ArrowRight className="h-3 w-3 text-zig-orange" />
            单二进制交付，直接分发即可运行
          </span>
        </div>
      </div>
    </div>
  )
}
