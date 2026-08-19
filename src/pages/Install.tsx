import PageLayout from '../components/PageLayout'
import CodeBlock from '../components/CodeBlock'
import SectionCard from '../components/SectionCard'

const packageManagers = [
  { name: 'macOS (Homebrew)', cmd: 'brew install zig' },
  { name: 'macOS (MacPorts)', cmd: 'sudo port install zig' },
  { name: 'Arch Linux', cmd: 'sudo pacman -S zig' },
  { name: 'Fedora', cmd: 'sudo dnf install zig' },
  { name: 'FreeBSD', cmd: 'pkg install zig' },
  { name: 'NixOS', cmd: 'nix-env -i zig' },
  { name: 'Void Linux', cmd: 'sudo xbps-install zig' },
  { name: 'Gentoo', cmd: 'emerge -av dev-lang/zig' },
]

export default function Install() {
  return (
    <PageLayout
      title="安装 Zig"
      description="多种方式获取并安装 Zig 编译器——从预编译二进制文件到包管理器，应有尽有。"
    >
      {/* Download Pre-built */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">下载预编译的二进制文件</h2>
        <p className="mb-4 text-zig-text-muted">
          Zig 官方为所有主流平台提供预编译的二进制文件。这是最简单的安装方式——
          只需下载、解压，然后立即开始使用，无需全局安装。
        </p>
        <div className="rounded-xl border border-zig-orange/30 bg-zig-orange/5 p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-zig-text-bright">官方下载页面</h3>
              <p className="mt-1 text-sm text-zig-text-muted">
                包含所有支持平台的最新版本与历史版本
              </p>
            </div>
            <a
              href="https://ziglang.org/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-zig-orange px-6 py-2.5 text-sm font-semibold text-zig-darker transition-colors hover:bg-zig-orange-light"
            >
              前往下载 ↗
            </a>
          </div>
        </div>
      </section>

      {/* Installation Structure */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">安装结构</h2>
        <p className="mb-4 text-zig-text-muted">
          一个 Zig 安装由两部分组成：
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SectionCard title="1. Zig 可执行文件">
            <p>编译器本身，通常命名为 <code>zig</code> 或 <code>zig.exe</code>。</p>
          </SectionCard>
          <SectionCard title="2. lib/ 目录">
            <p>包含标准库和其他必要的支持文件。</p>
          </SectionCard>
        </div>
        <p className="mt-4 text-zig-text-muted">
          在运行时，可执行文件会在文件系统中相对于自身向上逐级查找 <code>lib/</code> 目录：
        </p>
        <CodeBlock lang="text" title="查找路径">
{`lib/
lib/zig/
../lib/
../lib/zig/
（依此类推）`}
        </CodeBlock>
        <div className="mt-4 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
          <p className="text-sm text-zig-text">
            💡 这意味着你可以<strong className="text-zig-orange-light">把 Zig 的发行包解压到任意位置</strong>，
            然后立即开始使用。无需全局安装，不过这种机制同样支持全局安装的场景
            （例如 <code>/usr/bin/zig</code> 和 <code>/usr/lib/zig/</code>）。
          </p>
        </div>
      </section>

      {/* Package Managers */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">通过包管理器安装</h2>
        <p className="mb-6 text-zig-text-muted">
          许多操作系统已提供 Zig 的包管理器安装方式。选择你的平台：
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {packageManagers.map((pm) => (
            <div key={pm.name} className="rounded-lg border border-zig-border bg-zig-surface/40 p-4">
              <h4 className="font-display mb-2 text-sm font-semibold text-zig-text-bright">{pm.name}</h4>
              <CodeBlock lang="bash">{pm.cmd}</CodeBlock>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p className="mb-2 text-zig-text-muted">
            更多安装方式（如 snap、 Chocolatey、Scoop 等）请参考官方文档：
          </p>
          <a
            href="https://ziglang.org/learn/getting-started/#managers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zig-orange hover:text-zig-orange-light"
          >
            查看所有包管理器 ↗
          </a>
        </div>
      </section>

      {/* Bootstrap */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">为任意目标引导构建 Zig</h2>
        <p className="mb-4 text-zig-text-muted">
          如果你需要为非主流平台或特定目标构建 Zig，可以使用 zig-bootstrap 项目，
          它会自动从源码编译 Zig 及其所有依赖：
        </p>
        <div className="rounded-xl border border-zig-border bg-zig-surface/40 p-6">
          <h4 className="font-display mb-2 font-semibold text-zig-text-bright">zig-bootstrap</h4>
          <p className="mb-4 text-sm text-zig-text-muted">
            为任意目标交叉编译 Zig 编译器及其依赖的工具链。
          </p>
          <a
            href="https://codeberg.org/ziglang/zig-bootstrap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zig-orange hover:text-zig-orange-light"
          >
            前往 zig-bootstrap 仓库 ↗
          </a>
        </div>
      </section>

      {/* Verify */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">验证安装</h2>
        <p className="mb-4 text-zig-text-muted">
          安装完成后，运行以下命令验证 Zig 是否正确安装：
        </p>
        <CodeBlock lang="bash" title="验证安装">
{`zig version`}
        </CodeBlock>
        <p className="mt-4 text-zig-text-muted">
          你也可以查看标准库文档，Zig 会启动一个本地 HTTP 服务器：
        </p>
        <CodeBlock lang="bash" title="查看标准库文档">
{`zig std`}
        </CodeBlock>
        <p className="mt-2 text-sm text-zig-text-muted/70">
          这会在浏览器中打开一个交互式、可搜索的标准库文档页面。
        </p>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">下一步</h2>
        <div className="rounded-xl border border-zig-border bg-zig-surface/40 p-6">
          <p className="text-zig-text-muted">
            安装完成后，你可以：
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-zig-orange">→</span>
              <span className="text-zig-text">
                创建你的第一个 Zig 程序：<code>zig init</code> 会生成一个项目模板
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-zig-orange">→</span>
              <span className="text-zig-text">
                运行 Zig 文件：<code>zig run hello.zig</code>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-zig-orange">→</span>
              <span className="text-zig-text">
                构建项目：<code>zig build</code>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-zig-orange">→</span>
              <span className="text-zig-text">
                格式化代码：<code>zig fmt .</code>
              </span>
            </li>
          </ul>
        </div>
      </section>
    </PageLayout>
  )
}
