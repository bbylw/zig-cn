import { useState } from 'react'
import { Check, Copy, Download, Terminal, CheckCircle2, Apple, Monitor, Cpu } from 'lucide-react'
import confetti from 'canvas-confetti'

interface OSConfig {
  id: string
  name: string
  icon: typeof Apple
  archs: {
    name: string
    tarball: string
    size: string
    shasum: string
    directUrl: string
  }[]
  oneLiner: string
  packageManagerCmd: string
  pmName: string
}

const OS_DATA: Record<string, OSConfig> = {
  macos: {
    id: 'macos',
    name: 'macOS',
    icon: Apple,
    archs: [
      {
        name: 'Apple Silicon (M1/M2/M3/M4 aarch64)',
        tarball: 'zig-macos-aarch64-0.14.0.tar.xz',
        size: '41.2 MB',
        shasum: 'a9e18b4e7234b68e98711e9f1a23e...',
        directUrl: 'https://ziglang.org/download/0.14.0/zig-macos-aarch64-0.14.0.tar.xz',
      },
      {
        name: 'Intel x86_64',
        tarball: 'zig-macos-x86_64-0.14.0.tar.xz',
        size: '44.8 MB',
        shasum: 'c81b299e56312a02187b99c71e21b...',
        directUrl: 'https://ziglang.org/download/0.14.0/zig-macos-x86_64-0.14.0.tar.xz',
      },
    ],
    oneLiner: 'brew install zig',
    pmName: 'Homebrew',
    packageManagerCmd: 'brew install zig',
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    icon: Terminal,
    archs: [
      {
        name: 'Linux x86_64',
        tarball: 'zig-linux-x86_64-0.14.0.tar.xz',
        size: '43.5 MB',
        shasum: 'e3b0c44298fc1c149afbf4c8996fb...',
        directUrl: 'https://ziglang.org/download/0.14.0/zig-linux-x86_64-0.14.0.tar.xz',
      },
      {
        name: 'Linux aarch64 (ARM 64-bit)',
        tarball: 'zig-linux-aarch64-0.14.0.tar.xz',
        size: '39.8 MB',
        shasum: '4f53cda18c2baa0c0354bb5f9a3ec...',
        directUrl: 'https://ziglang.org/download/0.14.0/zig-linux-aarch64-0.14.0.tar.xz',
      },
      {
        name: 'Linux riscv64 (RISC-V)',
        tarball: 'zig-linux-riscv64-0.14.0.tar.xz',
        size: '38.2 MB',
        shasum: '1d2e3f4a5b6c7d8e9f0a1b2c3d4e5...',
        directUrl: 'https://ziglang.org/download/0.14.0/zig-linux-riscv64-0.14.0.tar.xz',
      },
    ],
    oneLiner: 'sudo pacman -S zig # 或 sudo dnf install zig',
    pmName: '各大 Linux 发行版包管理器',
    packageManagerCmd: 'sudo pacman -S zig',
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    icon: Monitor,
    archs: [
      {
        name: 'Windows x86_64 (64-bit)',
        tarball: 'zig-windows-x86_64-0.14.0.zip',
        size: '52.1 MB',
        shasum: 'f721a983bb02e741c0989f66551b9...',
        directUrl: 'https://ziglang.org/download/0.14.0/zig-windows-x86_64-0.14.0.zip',
      },
      {
        name: 'Windows aarch64 (ARM64)',
        tarball: 'zig-windows-aarch64-0.14.0.zip',
        size: '48.9 MB',
        shasum: '8b3c99a012e8734bbd8e2098246a4...',
        directUrl: 'https://ziglang.org/download/0.14.0/zig-windows-aarch64-0.14.0.zip',
      },
    ],
    oneLiner: 'winget install -e --id zig.zig',
    pmName: 'Windows 包管理器 (winget / scoop / choco)',
    packageManagerCmd: 'winget install -e --id zig.zig',
  },
}

export default function InstallMatrix() {
  const [selectedOS, setSelectedOS] = useState('macos')
  const [versionType, setVersionType] = useState<'stable' | 'master'>('stable')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const currentOS = OS_DATA[selectedOS] || OS_DATA.macos

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
    confetti({
      particleCount: 16,
      spread: 35,
      origin: { y: 0.85 },
      colors: ['#F7A41D', '#60A5FA', '#34D399'],
    })
  }

  return (
    <div className="rounded-2xl border border-zinc-700/70 bg-[#141420] p-6 sm:p-8 shadow-2xl">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span>🚀 快速下载与安装</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono text-emerald-400">
              v0.14.0 正式版
            </span>
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            Zig 是纯粹的单二进制分发包——无需复杂的全局安装器，解压即用。
          </p>
        </div>

        {/* Version Switcher */}
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 p-1">
          <button
            onClick={() => setVersionType('stable')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              versionType === 'stable'
                ? 'bg-zig-orange text-zinc-950 font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Release 0.14.0 (推荐稳定版)
          </button>
          <button
            onClick={() => setVersionType('master')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              versionType === 'master'
                ? 'bg-zig-orange text-zinc-950 font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Master (Nightly 夜间构建)
          </button>
        </div>
      </div>

      {/* OS Switcher Tabs */}
      <div className="flex items-center gap-2 pt-6 overflow-x-auto pb-2">
        {Object.values(OS_DATA).map((os) => {
          const Icon = os.icon
          const active = os.id === selectedOS
          return (
            <button
              key={os.id}
              onClick={() => setSelectedOS(os.id)}
              className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                active
                  ? 'border border-zig-orange bg-zig-orange/15 text-zinc-100 shadow-md shadow-zig-orange/10'
                  : 'border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-200'
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? 'text-zig-orange' : 'text-zinc-400'}`} />
              <span>{os.name}</span>
            </button>
          )
        })}
      </div>

      {/* Binary cards for selected OS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {currentOS.archs.map((arch, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-zinc-700/60 bg-[#161626] p-5 transition-all hover:border-zig-orange/50 hover:bg-[#1a1a2e]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-zinc-100 flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-zig-orange" />
                  {arch.name}
                </span>
                <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                  {arch.size}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-zinc-400 break-all bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                📦 {arch.tarball}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 pt-2 border-t border-zinc-800/60">
              <a
                href={arch.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-zig-orange px-4 py-2 text-xs font-bold text-zinc-950 transition-all hover:bg-zig-orange-light shadow-md shadow-zig-orange/15 active:scale-95"
              >
                <Download className="h-3.5 w-3.5" />
                <span>直接下载预编译包</span>
              </a>
              <button
                onClick={() => handleCopy(arch.directUrl, `url-${idx}`)}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                title="复制下载链接"
              >
                {copiedKey === `url-${idx}` ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package manager one-liner command */}
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-zig-orange" />
            或使用命令行包管理器一键安装：
          </span>
          <span className="text-xs text-zinc-500 font-mono">{currentOS.pmName}</span>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-[#0e0e17] px-3.5 py-2.5">
          <code className="font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto whitespace-nowrap">
            $ {currentOS.packageManagerCmd}
          </code>
          <button
            onClick={() => handleCopy(currentOS.packageManagerCmd, 'pm-cmd')}
            className="flex items-center gap-1 rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors shrink-0"
          >
            {copiedKey === 'pm-cmd' ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-xs">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="text-xs">复制命令</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step by step install guide */}
      <div className="mt-8 rounded-xl border border-zinc-800 bg-[#12121e] p-5">
        <h4 className="font-display font-semibold text-zinc-200 mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-zig-orange" />
          解压即用配置步骤（只需 3 步）：
        </h4>
        <ol className="space-y-2.5 text-xs text-zinc-300 leading-relaxed list-decimal list-inside">
          <li>
            下载对应系统的压缩包并解压到任意目录（例如 <code>~/zig</code> 或 <code>C:\zig</code>）。
          </li>
          <li>
            将解压后包含 <code>zig</code> 可执行文件的目录添加到系统 <code>PATH</code> 环境变量中。
          </li>
          <li>
            打开终端执行 <code>zig version</code>，看到版本号输出即代表安装成功！
          </li>
        </ol>
      </div>
    </div>
  )
}
