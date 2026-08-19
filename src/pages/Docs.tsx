import PageLayout from '../components/PageLayout'
import CodeBlock from '../components/CodeBlock'

const docLinks = [
  {
    title: '语言参考',
    desc: 'Zig 语言的完整参考手册，包含语法、类型系统、控制流等所有语言特性的详细说明。',
    url: 'https://ziglang.org/documentation/',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: '标准库文档',
    desc: '通过运行 zig std 在浏览器中查看交互式标准库文档。可搜索、可浏览所有模块。',
    url: 'https://ziglang.org/documentation/master/std/',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
  },
  {
    title: '下载页面',
    desc: '根据你所使用的 Zig 版本点击相应链接，查阅对应的发行说明、语言参考或标准库文档。',
    url: 'https://ziglang.org/download',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    title: '入门指南',
    desc: '从零开始学习 Zig，包括安装、第一个程序、基本概念和进阶主题。',
    url: 'https://ziglang.org/learn/',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const commonCommands = [
  { cmd: 'zig init', desc: '在当前目录初始化一个新的 Zig 项目' },
  { cmd: 'zig build', desc: '使用 build.zig 构建项目' },
  { cmd: 'zig run <file>', desc: '编译并运行一个 Zig 源文件' },
  { cmd: 'zig test <file>', desc: '运行一个 Zig 文件中的测试' },
  { cmd: 'zig fmt <path>', desc: '格式化 Zig 源代码' },
  { cmd: 'zig std', desc: '启动本地 HTTP 服务器查看标准库文档' },
  { cmd: 'zig build -h', desc: '查看构建系统的可用选项' },
  { cmd: 'zig cc <file>', desc: '使用 Zig 作为 C 编译器' },
  { cmd: 'zig c++ <file>', desc: '使用 Zig 作为 C++ 编译器' },
  { cmd: 'zig translate-c <file>', desc: '将 C 源代码翻译为 Zig 源代码' },
]

export default function Docs() {
  return (
    <PageLayout
      title="文档与资源"
      description="Zig 的官方文档、学习资源和常用命令参考。"
    >
      {/* Official Documentation */}
      <section className="mb-12">
        <h2 className="font-display mb-6 text-2xl font-semibold text-zig-text-bright">官方文档</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {docLinks.map((doc) => (
            <a
              key={doc.title}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-all hover:border-zig-orange/40 hover:bg-zig-surface/70"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zig-orange/10 text-zig-orange">
                {doc.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-zig-text-bright">{doc.title}</h3>
              <p className="mt-2 text-sm text-zig-text-muted">{doc.desc}</p>
              <span className="mt-3 inline-block text-sm font-medium text-zig-orange group-hover:text-zig-orange-light">
                查看文档 ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Local Documentation */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">本地查看文档</h2>
        <p className="mb-4 text-zig-text-muted">
          如果你已经安装了 Zig，可以直接在本地查看文档：
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <h4 className="font-display mb-2 font-semibold text-zig-text-bright">查看标准库文档</h4>
            <p className="mb-3 text-sm text-zig-text-muted">
              运行以下命令会在浏览器中打开一个交互式、可搜索的标准库文档页面：
            </p>
            <CodeBlock lang="bash">zig std</CodeBlock>
          </div>
          <div className="rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <h4 className="font-display mb-2 font-semibold text-zig-text-bright">查看语言参考</h4>
            <p className="mb-3 text-sm text-zig-text-muted">
              如果你使用的是 Zig 的某个发行版本，语言参考位于：
            </p>
            <CodeBlock lang="text">doc/langref.html</CodeBlock>
            <p className="mt-2 text-sm text-zig-text-muted">
              也可以在源码仓库中查看：<a href="https://codeberg.org/ziglang/zig/src/branch/master/doc/langref.html.in" target="_blank" rel="noopener noreferrer" className="text-zig-orange hover:text-zig-orange-light">doc/langref.html.in ↗</a>
            </p>
          </div>
        </div>
      </section>

      {/* Common Commands */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">常用命令参考</h2>
        <div className="overflow-hidden rounded-xl border border-zig-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zig-border bg-zig-surface/70">
              <tr>
                <th className="px-4 py-3 font-semibold text-zig-text-bright">命令</th>
                <th className="px-4 py-3 font-semibold text-zig-text-bright">说明</th>
              </tr>
            </thead>
            <tbody>
              {commonCommands.map((item, i) => (
                <tr key={item.cmd} className={i % 2 === 0 ? 'bg-zig-surface/30' : ''}>
                  <td className="border-b border-zig-border/50 px-4 py-3">
                    <code className="text-zig-orange-light">{item.cmd}</code>
                  </td>
                  <td className="border-b border-zig-border/50 px-4 py-3 text-zig-text-muted">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">学习资源</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="https://ziglang.org/learn/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-all hover:border-zig-orange/40"
          >
            <h3 className="font-display font-semibold text-zig-text-bright">官方学习中心</h3>
            <p className="mt-2 text-sm text-zig-text-muted">
              包含入门教程、示例代码和进阶指南。
            </p>
          </a>
          <a
            href="https://zig.guide/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-all hover:border-zig-orange/40"
          >
            <h3 className="font-display font-semibold text-zig-text-bright">Zig Guide</h3>
            <p className="mt-2 text-sm text-zig-text-muted">
              社区维护的循序渐进学习指南。
            </p>
          </a>
          <a
            href="https://ziggit.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-all hover:border-zig-orange/40"
          >
            <h3 className="font-display font-semibold text-zig-text-bright">Ziggit 社区论坛</h3>
            <p className="mt-2 text-sm text-zig-text-muted">
              Zig 开发者讨论和问答社区。
            </p>
          </a>
          <a
            href="https://www.openmymind.net/learning_zig/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-all hover:border-zig-orange/40"
          >
            <h3 className="font-display font-semibold text-zig-text-bright">Learning Zig</h3>
            <p className="mt-2 text-sm text-zig-text-muted">
              Karl Seguin 编写的 Zig 学习笔记。
            </p>
          </a>
        </div>
      </section>

      {/* About */}
      <section>
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">关于本站</h2>
        <div className="rounded-xl border border-zig-border bg-zig-surface/40 p-6">
          <p className="text-zig-text-muted">
            本站是 Zig 编程语言的中文社区站点，内容基于 Zig 官方 README 文档翻译整理。
          </p>
          <p className="mt-4 text-zig-text-muted">
            Zig 是一种用于编写<strong className="text-zig-orange-light">健壮</strong>、
            <strong className="text-zig-orange-light">最优</strong>且
            <strong className="text-zig-orange-light">可复用</strong>软件的通用编程语言及工具链。
            它由 Andrew Kelley 创建，采用 BDFN 治理模式，是自由开源软件（FOSS）。
          </p>
          <p className="mt-4 text-zig-text-muted">
            官方网站：<a href="https://ziglang.org/" target="_blank" rel="noopener noreferrer" className="text-zig-orange hover:text-zig-orange-light">https://ziglang.org/ ↗</a>
          </p>
          <p className="mt-2 text-zig-text-muted">
            源码仓库：<a href="https://codeberg.org/ziglang/zig" target="_blank" rel="noopener noreferrer" className="text-zig-orange hover:text-zig-orange-light">https://codeberg.org/ziglang/zig ↗</a>
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
