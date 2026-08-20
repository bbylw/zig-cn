import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import CodeBlock from '../components/CodeBlock'
import SectionCard from '../components/SectionCard'
import InstallMatrix from '../components/InstallMatrix'
import {
  FolderTree,
  Package,
  Terminal,
  CheckCircle,
  Search,
  Zap,
} from 'lucide-react'

const packageManagers = [
  { name: 'macOS (Homebrew)', cmd: 'brew install zig', os: 'macOS' },
  { name: 'macOS (MacPorts)', cmd: 'sudo port install zig', os: 'macOS' },
  { name: 'Windows (winget)', cmd: 'winget install -e --id zig.zig', os: 'Windows' },
  { name: 'Windows (Scoop)', cmd: 'scoop install zig', os: 'Windows' },
  { name: 'Windows (Chocolatey)', cmd: 'choco install zig', os: 'Windows' },
  { name: 'Arch Linux', cmd: 'sudo pacman -S zig', os: 'Linux' },
  { name: 'Fedora', cmd: 'sudo dnf install zig', os: 'Linux' },
  { name: 'FreeBSD', cmd: 'pkg install zig', os: 'BSD' },
  { name: 'NixOS', cmd: 'nix-env -i zig', os: 'Linux' },
  { name: 'Void Linux', cmd: 'sudo xbps-install zig', os: 'Linux' },
  { name: 'Gentoo', cmd: 'emerge -av dev-lang/zig', os: 'Linux' },
  { name: 'Alpine Linux (Edge)', cmd: 'apk add zig', os: 'Linux' },
]

const SHELL_PATHS = [
  {
    id: 'zsh',
    name: 'Zsh (~/.zshrc - macOS / Linux 默认)',
    cmd: `export PATH="$HOME/zig:$PATH"`,
  },
  {
    id: 'bash',
    name: 'Bash (~/.bashrc 或 ~/.bash_profile)',
    cmd: `export PATH="$HOME/zig:$PATH"`,
  },
  {
    id: 'fish',
    name: 'Fish Shell (~/.config/fish/config.fish)',
    cmd: `fish_add_path ~/zig`,
  },
  {
    id: 'powershell',
    name: 'Windows PowerShell (用户环境变量)',
    cmd: `[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\\zig", "User")`,
  },
]

export default function Install() {
  const [pmFilter, setPmFilter] = useState('')
  const [activeShell, setActiveShell] = useState('zsh')

  const filteredPMs = packageManagers.filter(
    (pm) =>
      pm.name.toLowerCase().includes(pmFilter.toLowerCase()) ||
      pm.os.toLowerCase().includes(pmFilter.toLowerCase()) ||
      pm.cmd.toLowerCase().includes(pmFilter.toLowerCase())
  )

  const currentShellConfig = SHELL_PATHS.find((s) => s.id === activeShell) || SHELL_PATHS[0]

  return (
    <PageLayout
      title="安装 Zig 工具链"
      description="获取并配置 Zig 编译器——从官方预编译单二进制包，到各大操作系统的包管理器命令。"
      badge="Zig 0.14 安装矩阵"
    >
      {/* ── Interactive Install Matrix (Top Priority) ── */}
      <section className="mb-14">
        <InstallMatrix />
      </section>

      {/* ── PATH Environment Configuration ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            配置系统 PATH 环境变量
          </h2>
        </div>
        <p className="mb-4 text-zinc-400 text-sm leading-relaxed">
          将解压出来的包含 <code>zig</code> 可执行文件的目录添加到系统 <code>PATH</code> 后，你在终端任意路径下都可以直接使用 <code>zig</code> 指令。
        </p>

        {/* Shell Switcher Tabs */}
        <div className="overflow-hidden rounded-2xl border border-zinc-700/80 bg-[#151522] p-5">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
            {SHELL_PATHS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveShell(s.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeShell === s.id
                    ? 'bg-zig-orange text-zinc-950 shadow'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {s.name.split(' (')[0]}
              </button>
            ))}
          </div>

          <div className="pt-4">
            <p className="text-xs text-zinc-400 mb-2 font-mono">
              配置文件：{currentShellConfig.name}
            </p>
            <CodeBlock lang="bash" title="添加到环境变量配置">
              {currentShellConfig.cmd}
            </CodeBlock>
            <p className="mt-2 text-xs text-zinc-500">
              💡 假设你将解压出来的文件夹重命名为了 <code>zig</code> 并存放在用户主目录下。请根据实际存放路径替换。
            </p>
          </div>
        </div>
      </section>

      {/* ── Installation Structure ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <FolderTree className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            Zig 的极简安装目录结构
          </h2>
        </div>
        <p className="mb-6 text-zinc-400 text-sm leading-relaxed">
          Zig 没有任何复杂的注册表或隐藏依赖。一个完整的 Zig 发行版仅包含以下两部分：
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SectionCard
            title="1. zig (或 zig.exe)"
            badge="可执行文件"
            icon={<Zap className="h-5 w-5" />}
          >
            <p>
              完整的自包含编译器本体，自带交叉编译器后端与轻量链接器，无任何额外动态库依赖。
            </p>
          </SectionCard>
          <SectionCard
            title="2. lib/ 目录"
            badge="标准库与头文件"
            icon={<Package className="h-5 w-5" />}
          >
            <p>
              包含 Zig 标准库全部源码、常用平台的 libc 头文件（musl, glibc, mingw）以及编译器文档。
            </p>
          </SectionCard>
        </div>

        <div className="mt-6 rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
          <h4 className="font-display text-sm font-semibold text-zinc-200 mb-2">
            🔍 运行时自动路径探测逻辑：
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            <code>zig</code> 在运行时会相对于自身目录逐级向上自动定位 <code>lib/</code> 或 <code>lib/zig/</code> 目录。
            这意味着你把压缩包解压在任何目录都能直接运行，完全支持便携式 U 盘或容器内无侵入使用！
          </p>
        </div>
      </section>

      {/* ── Package Managers ── */}
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-zig-orange" />
            <h2 className="font-display text-2xl font-bold text-zinc-100">
              通过包管理器安装
            </h2>
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="过滤包管理器 / OS..."
              value={pmFilter}
              onChange={(e) => setPmFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:border-zig-orange focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredPMs.map((pm) => (
            <div
              key={pm.name}
              className="card-lift rounded-xl border border-zinc-700/70 bg-[#151522] p-4 transition-all hover:border-zinc-500"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-sm font-semibold text-zinc-200">
                  {pm.name}
                </span>
                <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  {pm.os}
                </span>
              </div>
              <CodeBlock lang="bash">{pm.cmd}</CodeBlock>
            </div>
          ))}
        </div>
      </section>

      {/* ── Verify & Next Steps ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-6 w-6 text-emerald-400" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            验证安装与入门命令
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-700 bg-[#151522] p-5">
            <h4 className="font-display text-sm font-semibold text-zinc-200 mb-1">
              1. 验证 Zig 是否已加入 PATH
            </h4>
            <p className="text-xs text-zinc-400 mb-3">输出对应的版本号即表示安装成功：</p>
            <CodeBlock lang="bash">zig version</CodeBlock>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-[#151522] p-5">
            <h4 className="font-display text-sm font-semibold text-zinc-200 mb-1">
              2. 启动本地交互式标准库文档
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Zig 会在本地启动一个高速 HTTP 服务器，并在浏览器中打开标准库文档：
            </p>
            <CodeBlock lang="bash">zig std</CodeBlock>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-[#151522] p-5">
            <h4 className="font-display text-sm font-semibold text-zinc-200 mb-1">
              3. 初始化你的第一个 Zig 项目
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              在空目录下运行 <code>zig init</code>，会生成 <code>build.zig</code> 和示例代码：
            </p>
            <CodeBlock lang="bash">{`mkdir my_project
cd my_project
zig init
zig build run`}</CodeBlock>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
