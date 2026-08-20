import { ArrowUp, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ZigLogo from './ZigLogo'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-zinc-800/80 bg-[#0d0d16] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <ZigLogo size={28} />
              <span className="font-display text-lg font-bold text-zinc-100">
                Zig<span className="text-zig-orange">中文社区</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[45ch] text-sm leading-relaxed text-zinc-400">
              一种用于编写<strong className="text-zinc-200 font-semibold">健壮</strong>、
              <strong className="text-zinc-200 font-semibold">最优</strong>且
              <strong className="text-zinc-200 font-semibold">可复用</strong>软件的现代通用系统级编程语言及工具链。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>自由开源软件 (FOSS)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>BDFN 治理模式</span>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-zinc-200">
              网站导航
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-zig-orange">
                  社区首页
                </Link>
              </li>
              <li>
                <Link to="/install" className="transition-colors hover:text-zig-orange">
                  下载与安装
                </Link>
              </li>
              <li>
                <Link to="/build" className="transition-colors hover:text-zig-orange">
                  从源码构建 Zig
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="transition-colors hover:text-zig-orange">
                  参与社区贡献
                </Link>
              </li>
              <li>
                <Link to="/docs" className="transition-colors hover:text-zig-orange">
                  文档与命令速查
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-zinc-200">
              官方资源
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://ziglang.org/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  官方下载列表
                </a>
              </li>
              <li>
                <a
                  href="https://ziglang.org/documentation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  语言参考文档 (LangRef)
                </a>
              </li>
              <li>
                <a
                  href="https://ziglang.org/learn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  官方学习教程
                </a>
              </li>
              <li>
                <a
                  href="https://codeberg.org/ziglang/zig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  Codeberg 源码仓库
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ziglang/zig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  GitHub 镜像仓库
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Donation */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-zinc-200">
              社区与支持
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://ziglang.org/community/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  全球社区交流
                </a>
              </li>
              <li>
                <a
                  href="https://ziggit.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  Ziggit 论坛
                </a>
              </li>
              <li>
                <a
                  href="https://ziglang.org/zsf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 font-semibold transition-colors hover:text-amber-300"
                >
                  <Heart className="h-3.5 w-3.5 fill-current text-rose-500" />
                  <span>支持 Zig 基金会 (ZSF)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://codeberg.org/ziglang/zig/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-zig-orange"
                >
                  提交 Bug 与 Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80 pt-8 text-xs text-zinc-500">
          <div>
            <p>© {new Date().getFullYear()} Zig 中文社区 · 内容基于 Zig 官方文档翻译与中文生态整理</p>
            <p className="mt-1 text-zinc-600">
              Zig 语言由 Andrew Kelley 及全球贡献者共同维护。所有商标归属各自所有者。
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200 active:scale-95"
          >
            <ArrowUp className="h-3.5 w-3.5 text-zig-orange" />
            <span>返回顶部</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
