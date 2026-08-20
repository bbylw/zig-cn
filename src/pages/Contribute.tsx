import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import CodeBlock from '../components/CodeBlock'
import {
  Users,
  AlertOctagon,
  Heart,
  Code2,
  ExternalLink,
  MessageSquare,
  Bug,
} from 'lucide-react'

interface Tab {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: 'write', label: '1. 用 Zig 编写开源项目' },
  { id: 'talk', label: '2. 传播与技术分享' },
  { id: 'edit', label: '3. 编辑编译器源码' },
  { id: 'test', label: '4. 运行全套测试' },
  { id: 'translate-c', label: '5. 改进 Translate-C' },
  { id: 'autodoc', label: '6. Autodoc 维护' },
  { id: 'lldb', label: '7. LLDB 调试技巧' },
]

export default function Contribute() {
  const [activeTab, setActiveTab] = useState('write')

  return (
    <PageLayout
      title="参与 Zig 社区与开源贡献"
      description="Zig 是完全自由且开源的软件项目 (FOSS)。无论是开发项目反馈用例、撰写教程，还是提交底层编译器补丁，我们都非常欢迎！"
      badge="开源协作"
    >
      {/* ── Community & Governance ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            社区治理与发展基金会
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="card-lift rounded-2xl border border-zinc-700/80 bg-[#161626] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-zig-orange">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
                全球社区
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-100 mb-2">
              加入开发者社群
            </h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              参与全球 Discord、Matrix、Ziggit 以及中文社区交流，与其他系统工程师探讨底层架构与优化。
            </p>
            <a
              href="https://ziglang.org/community/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-zig-orange hover:text-zig-orange-light"
            >
              <span>访问官方社区入口</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="card-lift rounded-2xl border border-zinc-700/80 bg-[#161626] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-rose-400">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] text-rose-400 border border-rose-500/20">
                501(c)(3) 非营利
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-100 mb-2">
              资助 Zig 软件基金会 (ZSF)
            </h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              通过按月捐助支持 Zig 核心全职开发者的薪酬以及全球 CI 测试服务器的高昂基础设施开销。
            </p>
            <a
              href="https://ziglang.org/zsf/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300"
            >
              <span>捐助 Zig Software Foundation</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-800 bg-[#151522] p-4 text-xs text-zinc-300 leading-relaxed">
          <strong className="text-zig-orange-light font-semibold">治理架构：</strong>
          Zig 采用 <strong>BDFN</strong>（Benevolent Dictator For Now，暂定的仁慈独裁者）治理模式，由语言创始人 Andrew Kelley 负责架构设计的全局统一性与最终决策。
        </div>
      </section>

      {/* ── Strict LLM Policy Warning Box ── */}
      <section className="mb-14">
        <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-950/25 to-[#151522] p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3">
            <AlertOctagon className="h-6 w-6 text-rose-400 shrink-0" />
            <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-100">
              ⚠️ 严格的禁用 LLM / 禁用 AI 生成代码政策
            </h3>
          </div>
          <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
            Zig 官方 Codeberg 仓库为了维护代码质量与审阅效率，执行严格的 AI 禁令：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-900/40 text-rose-200">
              <span className="text-rose-400 font-bold">✕</span>
              <span>Issue 中严禁使用 LLM 生成内容</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-900/40 text-rose-200">
              <span className="text-rose-400 font-bold">✕</span>
              <span>PR / 补丁严禁包含 AI 生成代码</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-900/40 text-rose-200">
              <span className="text-rose-400 font-bold">✕</span>
              <span>严禁使用 LLM 翻译评论文本</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-zinc-400">
            * 官方鼓励使用英语，但非强制。欢迎使用你的母语直接发帖，审阅者会使用自己的翻译工具理解。
          </p>
        </div>
      </section>

      {/* ── Detailed Ways to Contribute (Interactive Tabs) ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <Code2 className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            参与贡献的具体领域
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-zig-orange text-zinc-950 shadow'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="rounded-2xl border border-zinc-700 bg-[#141422] p-6 sm:p-8 shadow-2xl">
          {activeTab === 'write' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-100">
                用 Zig 编写开源个人项目
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                为 Zig 做出贡献的最佳方式之一，就是在你的真实项目（网络库、游戏引擎、嵌入式固件等）中使用 Zig。
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                这能帮助核心团队发现边缘 case 与真实世界的实际动机，使语言特性的进化更务实，同时能充实你的个人工程作品集！
              </p>
            </div>
          )}

          {activeTab === 'talk' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-100">
                传播与分享 Zig 技术见解
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                撰写高质量的技术博客、制作视频教程、在技术大会上演讲，或者在社区解答新手问题。编程语言生态的繁荣离不开每一位开发者的热情发声。
              </p>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-100">
                编辑与调试编译器源码
              </h3>
              <p className="text-sm text-zinc-400">
                修改本地编译器源码后，推荐使用以下快速增量构建命令：
              </p>
              <CodeBlock lang="sh" title="快速构建 Stage4 编译器">
{`stage3/bin/zig build -p stage4 -Denable-llvm -Dno-lib`}
              </CodeBlock>
              <p className="text-xs text-zinc-400">
                • <code>stage3/bin/zig</code>：优化过的 Master 构建，用于运行代码格式化等<br />
                • <code>stage4/bin/zig</code>：包含你本地修改的 Debug 构建，用于自测排错
              </p>
            </div>
          )}

          {activeTab === 'test' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-100">
                运行编译器与标准库测试
              </h3>
              <p className="text-sm text-zinc-400">
                提交 PR 之前，可使用以下节省时间的测试指令验证你的修改：
              </p>
              <CodeBlock lang="sh" title="快速验证测试">
{`stage4/bin/zig build test -Dskip-release -Dskip-non-native`}
              </CodeBlock>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <strong>只测标准库：</strong>
                  <br />
                  <code>stage4/bin/zig build test-std -Dskip-release</code>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <strong>只测编译器行为：</strong>
                  <br />
                  <code>stage4/bin/zig build test-behavior</code>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'translate-c' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-100">
                改进 Translate-C (C 转 Zig 工具)
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <code>translate-c</code> 是 Zig 的杀手级功能之一，基于用 Zig 编写的 <strong>arocc</strong> C 编译器。测试用例与实现均在 <code>translate-c</code> 独立子模块中维护。
              </p>
            </div>
          )}

          {activeTab === 'autodoc' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-100">
                Autodoc 交互式文档维护
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Autodoc 是基于 WebAssembly 的单页文档应用。在本地运行 <code>zig std</code> 即可启动热更新服务器，在浏览器中即时预览文档样式修改。
              </p>
            </div>
          )}

          {activeTab === 'lldb' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-100">
                使用 LLDB 调试 Zig
              </h3>
              <p className="text-sm text-zinc-400">
                在 <code>~/.lldbinit</code> 中配置 pretty printers 获得更清晰的结构体调试输出：
              </p>
              <CodeBlock lang="text" title="~/.lldbinit 配置">
{`command script import /path/to/zig/tools/lldb_pretty_printers.py
type category enable zig.lang
type category enable zig.std`}
              </CodeBlock>
            </div>
          )}
        </div>
      </section>

      {/* ── Contributor Friendly Issues ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <Bug className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            寻找新手友好的 Issue 任务
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="https://codeberg.org/ziglang/zig/issues?labels=741726&state=open"
            target="_blank"
            rel="noopener noreferrer"
            className="card-lift group rounded-2xl border border-zinc-700/80 bg-[#161626] p-6 transition-all hover:border-zinc-500"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-bold text-zinc-100">
                Contributor Friendly 标签
              </h3>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs text-emerald-400 font-mono">
                适合新手
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              难度适中、边界清晰，且对编译器深层机制了解要求较低的 issue 列表。
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-zig-orange group-hover:text-zig-orange-light">
              <span>在 Codeberg 查看任务列表 →</span>
            </span>
          </a>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h3 className="font-display text-lg font-bold text-zinc-100 mb-2">
              💡 提请注意：不接收语法提案
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Zig 语言的核心语法与语义已接近稳定期。请勿在 issue 跟踪器中提出随意修改语法关键词的提案。
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
