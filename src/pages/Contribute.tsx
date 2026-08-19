import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import CodeBlock from '../components/CodeBlock'

interface Tab {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: 'write', label: '用 Zig 编写软件' },
  { id: 'talk', label: '谈论 Zig' },
  { id: 'edit', label: '编辑源代码' },
  { id: 'test', label: '测试' },
  { id: 'translate-c', label: '改进 Translate-C' },
  { id: 'autodoc', label: 'Autodoc' },
  { id: 'lldb', label: '使用 LLDB 调试' },
]

export default function Contribute() {
  const [activeTab, setActiveTab] = useState('write')

  return (
    <PageLayout
      title="参与贡献"
      description="Zig 是自由开源软件。我们欢迎任何人提交 bug 报告与补丁，你也可以通过编写项目、撰写文章来为社区做出贡献。"
    >
      {/* Community & Governance */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">社区与治理</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zig-border bg-zig-surface/40 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zig-orange/10 text-zig-orange">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-display mb-2 font-semibold text-zig-text-bright">加入社区</h3>
            <p className="text-sm text-zig-text-muted">
              参与社区讨论，与其他 Zig 开发者交流。编程语言的兴衰取决于其生态系统的活跃度。
            </p>
            <a href="https://ziglang.org/community/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-zig-orange hover:text-zig-orange-light">
              前往社区 ↗
            </a>
          </div>
          <div className="rounded-xl border border-zig-border bg-zig-surface/40 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zig-orange/10 text-zig-orange">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-display mb-2 font-semibold text-zig-text-bright">按月捐助</h3>
            <p className="text-sm text-zig-text-muted">
              通过 Zig 软件基金会按月捐助，支持 Zig 的持续开发与维护。
            </p>
            <a href="https://ziglang.org/zsf/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-zig-orange hover:text-zig-orange-light">
              捐助 ↗
            </a>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
          <p className="text-sm text-zig-text">
            <strong className="text-zig-orange-light">治理模式：</strong>
            Zig 采用 BDFN（Benevolent Dictator For Now，暂定的仁慈独裁者）治理模式，
            即 Andrew Kelley 对一切的设计与实现拥有最终决定权。
          </p>
        </div>
      </section>

      {/* LLM Policy */}
      <section className="mb-12">
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
          <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-semibold text-zig-text-bright">
            <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            严格的禁用 LLM / 禁用 AI 政策
          </h2>
          <ul className="space-y-2 text-sm text-zig-text">
            <li className="flex items-start gap-2">
              <span className="text-red-400">✕</span>
              <span>issue 中不得使用 LLM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">✕</span>
              <span>补丁 / 拉取请求中不得使用 LLM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">✕</span>
              <span>在 bug 跟踪器上的评论中不得使用 LLM，包括翻译</span>
            </li>
          </ul>
          <p className="mt-3 text-sm text-zig-text-muted">
            鼓励使用英语，但非强制。欢迎你使用母语发帖，并依赖他人使用自己偏好的翻译工具来理解你的意思。
          </p>
        </div>
      </section>

      {/* Contribution Ways */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">贡献方式</h2>

        <div className="mb-6 flex flex-wrap gap-2 border-b border-zig-border pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-zig-orange' : 'text-zig-text-muted hover:text-zig-text-bright'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-zig-orange" />
              )}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-zig-border bg-zig-surface/30 p-6">
          {activeTab === 'write' && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-zig-text-bright">用 Zig 编写软件</h3>
              <p className="text-zig-text-muted">
                你能为 Zig 做出贡献的最佳方式之一，就是开始把它用于一个开源的个人项目。
              </p>
              <p className="mt-4 text-zig-text-muted">
                这能帮助我们发现 bug、充实使用场景，从而推动 Zig 进一步的迭代设计。
                重要的是，以此方式发现的每个问题都带有真实世界的动机，
                使人能够清晰地解释提案与功能请求背后的理由。
              </p>
              <p className="mt-4 text-zig-text-muted">
                理想情况下，这样的项目还能同时帮你学到新技能，并为你的个人作品集添砖加瓦。
              </p>
            </div>
          )}

          {activeTab === 'talk' && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-zig-text-bright">谈论 Zig</h3>
              <p className="text-zig-text-muted">
                另一种贡献方式，是撰写关于 Zig 的文章、在会议上演讲介绍 Zig，
                或者为你使用 Zig 的项目做上述任何一件事。
              </p>
              <p className="mt-4 text-zig-text-muted">
                编程语言的兴衰取决于其生态系统的活跃度。参与的人越多，
                我们就越能彼此在对方的抽象之上构建出伟大的事物。
              </p>
            </div>
          )}

          {activeTab === 'edit' && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-zig-text-bright">编辑源代码</h3>
              <p className="mb-4 text-zig-text-muted">
                从源码构建时，建议使用以下 CMake 设置：
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-zig-text-muted">
                  <span className="text-zig-orange">•</span>
                  <span><code>-DCMAKE_BUILD_TYPE=Release</code> —— 加快 zig 的重新编译速度</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-zig-text-muted">
                  <span className="text-zig-orange">•</span>
                  <span><code>-GNinja</code> —— Ninja 比 Make 更快、更易用</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-zig-text-muted">
                  <span className="text-zig-orange">•</span>
                  <span><code>-DZIG_NO_LIB=ON</code> —— 阻止构建系统将 lib/ 目录复制到安装前缀，使 zig 直接改用源码树中的 lib/</span>
                </div>
              </div>

              <h4 className="font-display mb-3 mt-6 font-semibold text-zig-orange-light">两种工作情景</h4>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-semibold text-zig-text-bright">1. 拉取上游变更并重新构建</p>
                  <CodeBlock lang="sh">{`git pull
ninja install`}</CodeBlock>
                  <p className="mt-1 text-xs text-zig-text-muted/70">预计耗时：约 10 分钟</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-zig-text-bright">2. 在做出本地修改后从源码构建</p>
                  <CodeBlock lang="sh">{`stage3/bin/zig build -p stage4 -Denable-llvm -Dno-lib`}</CodeBlock>
                  <p className="mt-1 text-xs text-zig-text-muted/70">预计耗时：约 20 秒</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
                <p className="text-sm text-zig-text">
                  你会得到两份 Zig 构建：
                  <br />
                  • <code>stage3/bin/zig</code> —— 经过优化的 master 分支构建，适用于 <code>zig fmt</code> 等杂项活动
                  <br />
                  • <code>stage4/bin/zig</code> —— 包含你本地修改的 debug 构建，适用于在提交补丁前进行调试与排错
                </p>
              </div>

              <h4 className="font-display mb-3 mt-6 font-semibold text-zig-orange-light">加速技巧</h4>
              <ul className="space-y-2 text-sm text-zig-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  不需要 LLVM 后端时，省略 <code>-Denable-llvm</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  使用 <code>-Ddev=foo</code> 以缩减后的特性集构建，用于开发特定功能
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  使用 <code>--watch -fincremental</code> 启用增量编译，带来近乎即时的重新构建
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'test' && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-zig-text-bright">测试</h3>
              <CodeBlock lang="sh" title="运行完整测试套件">
{`stage4/bin/zig build test`}
              </CodeBlock>
              <p className="mt-2 text-sm text-zig-text-muted">
                这会运行整个测试套件，耗时可能超过 1 小时。这是提交拉取请求时 CI 服务器所运行的内容。
              </p>

              <h4 className="font-display mb-3 mt-6 font-semibold text-zig-orange-light">节省时间的测试选项</h4>
              <CodeBlock lang="sh" title="缩减测试范围">
{`stage4/bin/zig build test -Dskip-release -Dskip-non-native`}
              </CodeBlock>
              <p className="mt-2 text-sm text-zig-text-muted">
                将时间从约 2 小时缩减到约 30 分钟，对于提交拉取请求前来说已足够。
              </p>

              <h4 className="font-display mb-3 mt-6 font-semibold text-zig-orange-light">测试特定集合</h4>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-zig-text">只运行标准库测试：</p>
                  <CodeBlock lang="sh">{`stage4/bin/zig build test-std -Dskip-release`}</CodeBlock>
                </div>
                <div>
                  <p className="mb-2 text-sm text-zig-text">测试编译器行为（修改编译器源代码时最有帮助）：</p>
                  <CodeBlock lang="sh">{`stage4/bin/zig build test-behavior`}</CodeBlock>
                </div>
                <div>
                  <p className="mb-2 text-sm text-zig-text">使用 zig test 直接测试标准库：</p>
                  <CodeBlock lang="sh">{`zig test lib/std/std.zig --zig-lib-dir lib`}</CodeBlock>
                </div>
                <div>
                  <p className="mb-2 text-sm text-zig-text">仅运行 json 相关测试：</p>
                  <CodeBlock lang="sh">{`zig test lib/std/std.zig --zig-lib-dir lib --test-filter "json."`}</CodeBlock>
                </div>
              </div>

              <h4 className="font-display mb-3 mt-6 font-semibold text-zig-orange-light">测试非原生架构</h4>
              <ul className="space-y-3 text-sm text-zig-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  <span><strong>QEMU</strong>：Linux CI 使用 <code>-fqemu</code> 测试 aarch64 等架构。建议 Linux 用户安装 QEMU 并启用该选项。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  <span><strong>Wine</strong>：在 Linux 上使用 <code>-fwine</code> 测试 Windows 行为和标准库。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  <span><strong>wasmtime</strong>：使用 <code>-fwasmtime</code> 启用运行 WASI 行为测试和标准库测试。</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'translate-c' && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-zig-text-bright">改进 Translate-C</h3>
              <p className="text-zig-text-muted">
                <code>translate-c</code> 是 Zig 提供的一项功能，可将 C 源代码转换为 Zig 源代码。
                它驱动 <code>zig translate-c</code> 命令，使 Zig 代码不仅能利用 C 头文件中定义的函数原型，
                还能利用 C 中编写的 <code>static inline</code> 函数，甚至部分宏。
              </p>
              <p className="mt-4 text-zig-text-muted">
                它现在基于 <strong className="text-zig-orange-light">arocc</strong>，
                一个用 Zig 编写的第三方 C 编译器。测试覆盖、bug 报告以及官方实现都在
                <a href="https://codeberg.org/ziglang/translate-c/" target="_blank" rel="noopener noreferrer" className="ml-1 text-zig-orange hover:text-zig-orange-light">translate-c 仓库</a>中。
              </p>
              <p className="mt-4 text-zig-text-muted">
                该包目前被 vendored（内置）到 Zig 源码树中。一旦其中的某个 issue 被解决（并补充了测试覆盖），
                这些改动可立即反向移植到 zig 编译器。
              </p>
              <p className="mt-4 text-zig-text-muted">
                未来该构建步骤将被移除，转而通过构建系统 / 包管理器显式依赖 translate-c 包。
                到那时，Zig 将停止 vendoring arocc。
              </p>
            </div>
          )}

          {activeTab === 'autodoc' && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-zig-text-bright">Autodoc</h3>
              <p className="text-zig-text-muted">
                Autodoc 是一个用于浏览 Zig 代码库的交互式、可搜索单页 Web 应用。
              </p>
              <p className="mt-4 text-zig-text-muted">一个 autodoc 部署包含：</p>
              <CodeBlock lang="text" title="部署结构">
{`index.html
main.js
main.wasm
sources.tar`}
              </CodeBlock>
              <ul className="mt-4 space-y-2 text-sm text-zig-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  <span><code>main.js</code> 和 <code>index.html</code> 是静态文件，位于 Zig 安装的 <code>lib/docs/</code> 中</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  <span><code>main.wasm</code> 由 <code>lib/docs/wasm/</code> 中的 Zig 文件编译而来</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  <span><code>sources.tar</code> 是项目的所有 zig 源文件</span>
                </li>
              </ul>
              <p className="mt-4 text-zig-text-muted">
                命令 <code>zig std</code> 会启动一个 HTTP 服务器，提供标准库相关的所有资源。
                该服务器会即时创建所请求的文件，在任意源文件发生变更时重新构建
                <code>main.wasm</code>、构造 <code>sources.tar</code>。
              </p>
              <p className="mt-4 text-zig-text-muted">
                这意味着你可以通过在浏览器中按下刷新，来测试对 Zig 标准库文档以及
                autodocs 功能的修改。在 URL 前加上 <code>/debug</code> 会生成
                <code>main.wasm</code> 的 debug 构建。
              </p>
              <div className="mt-4 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
                <p className="text-sm text-zig-text">
                  💡 推荐使用 Chromium 进行开发调试，配合
                  <a href="https://chromewebstore.google.com/detail/cc++-devtools-support-dwa/pdcpmagijalfljmkmjngeonclgbbannb" target="_blank" rel="noopener noreferrer" className="mx-1 text-zig-orange hover:text-zig-orange-light">C/C++ DevTools Support (DWARF)</a>
                  扩展可以让调试 Zig 的 WebAssembly 代码变得轻而易举。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'lldb' && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-zig-text-bright">使用 LLDB 测试 Zig 代码</h3>
              <p className="mb-4 text-zig-text-muted">
                <a href="https://github.com/jacobly0" target="_blank" rel="noopener noreferrer" className="text-zig-orange hover:text-zig-orange-light">@jacobly0</a>
                维护着一个带有 Zig 支持的 LLDB 分支：
              </p>
              <a href="https://github.com/jacobly0/llvm-project/tree/lldb-zig" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zig-orange hover:text-zig-orange-light">
                github.com/jacobly0/llvm-project/tree/lldb-zig ↗
              </a>
              <p className="mt-4 text-zig-text-muted">
                该分支仅包含针对由 Zig 自托管后端（即 <code>zig build-exe -fno-llvm ...</code>）
                编译出的程序的调试改动。
              </p>

              <h4 className="font-display mb-3 mt-6 font-semibold text-zig-orange-light">构建 LLDB</h4>
              <CodeBlock lang="sh" title="构建 LLDB 分支">
{`$ cmake llvm -G Ninja -B build \\
  -DLLVM_ENABLE_PROJECTS="clang;lldb" \\
  -DCMAKE_BUILD_TYPE=Release \\
  -DLLVM_ENABLE_ASSERTIONS=ON \\
  -DLLDB_ENABLE_LIBEDIT=ON \\
  -DLLDB_ENABLE_PYTHON=ON
$ cmake --build build --target lldb --target lldb-server`}
              </CodeBlock>

              <h4 className="font-display mb-3 mt-6 font-semibold text-zig-orange-light">Pretty Printers</h4>
              <p className="mb-4 text-zig-text-muted">
                调试 Zig 编译器或使用 LLVM 后端编译的项目时，通过使用
                <code>lldb_pretty_printers.py</code> 获得更好的调试体验。
                在 <code>~/.lldbinit</code> 中加入：
              </p>
              <CodeBlock lang="text" title="~/.lldbinit">
{`command script import /path/to/zig/tools/lldb_pretty_printers.py`}
              </CodeBlock>
              <p className="mt-4 text-zig-text-muted">
                如果你使用 Zig 的 LLVM 后端，还需要：
              </p>
              <CodeBlock lang="text" title="启用类型类别">
{`type category enable zig.lang
type category enable zig.std`}
              </CodeBlock>
              <p className="mt-2 text-zig-text-muted">
                如果要调试一个使用 LLVM 后端构建出的 Zig 编译器，还需要：
              </p>
              <CodeBlock lang="text">
{`type category enable zig.stage2`}
              </CodeBlock>
            </div>
          )}
        </div>
      </section>

      {/* Contributor Friendly Issues */}
      <section>
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">寻找对贡献者友好的 Issue</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="https://codeberg.org/ziglang/zig/issues?labels=741726&state=open"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-all hover:border-zig-orange/40"
          >
            <h3 className="font-display mb-2 font-semibold text-zig-text-bright">Contributor Friendly</h3>
            <p className="text-sm text-zig-text-muted">
              范围有限和/或对 Zig 内部机制了解要求不高的 issue 标签。
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-zig-orange group-hover:text-zig-orange-light">
              查看列表 →
            </span>
          </a>
          <a
            href="https://codeberg.org/ziglang/zig/issues?labels=746937&state=open"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zig-border bg-zig-surface/40 p-6 transition-all hover:border-zig-orange/40"
          >
            <h3 className="font-display mb-2 font-semibold text-zig-text-bright">Proposal: Proposed</h3>
            <p className="text-sm text-zig-text-muted">
              仍在考虑中的提案。针对此类提案的实现工作很可能白费力气。
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-zig-orange group-hover:text-zig-orange-light">
              查看列表 →
            </span>
          </a>
        </div>
        <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-sm text-zig-text">
            ⚠️ 我们不接受语言提案。请勿提出旨在修改 Zig 语言或语法的 issue。
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
