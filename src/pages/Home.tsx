import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '健壮性',
    desc: '明确的行为，没有隐藏的控制流、没有隐藏的内存分配。错误处理是显式的，编译器强制你处理所有错误路径。',
    span: 'lg:col-span-2',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '最优性能',
    desc: '直接与 C 竞争——没有运行时开销，没有垃圾回收。生成的代码媲美手写 C。',
    span: '',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: '编译时元编程',
    desc: 'comptime 在编译期执行任意 Zig 代码生成代码，泛型与类型推导是语言的一部分而非额外特性。',
    span: '',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '交叉编译',
    desc: '开箱即用的交叉编译，支持数十种目标平台。自带所有 libc 交叉编译支持，无需额外工具链。',
    span: 'lg:col-span-2',
  },
]

const codeExample = `const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}!\\n", .{"Zig"});

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list = std.ArrayList(u8).init(allocator);
    defer list.deinit();
    try list.appendSlice("健壮且最优");
    try stdout.print("{s}\\n", .{list.items});
}`

export default function Home() {
  return (
    <div>
      {/* ── Hero — asymmetric, left-weighted ── */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-zig-orange/8 blur-[120px]" />
        <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-zig-orange/4 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left — 7 cols */}
          <div className="lg:col-span-7">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-zig-orange/20 bg-zig-orange/5 px-3 py-1 text-xs font-medium text-zig-orange-light" style={{ ['--index' as string]: 0 }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zig-orange opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zig-orange" />
              </span>
              通用编程语言及工具链
            </div>

            <h1 className="animate-fade-up mt-6 text-5xl font-bold tracking-tighter text-zig-text-bright sm:text-6xl lg:text-7xl" style={{ ['--index' as string]: 1 }}>
              编写<span className="text-zig-orange">健壮</span>软件
              <br />
              的正确方式
            </h1>

            <p className="animate-fade-up mt-6 max-w-[55ch] text-lg leading-relaxed text-zig-text-muted" style={{ ['--index' as string]: 2 }}>
              Zig 是一种用于编写<span className="font-semibold text-zig-orange-light">最优</span>且
              <span className="font-semibold text-zig-orange-light">可复用</span>软件的通用编程语言。
              没有隐藏的控制流，没有隐藏的内存分配，没有垃圾回收——只有你和你对代码的完全掌控。
            </p>

            <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ ['--index' as string]: 3 }}>
              <Link
                to="/install"
                className="btn-tactile rounded-xl bg-zig-orange px-7 py-3.5 text-sm font-semibold text-zig-bg shadow-lg shadow-zig-orange/15 transition-all hover:bg-zig-orange-light"
              >
                获取 Zig 工具链
              </Link>
              <Link
                to="/docs"
                className="btn-tactile rounded-xl border border-zig-border bg-zig-surface/50 px-7 py-3.5 text-sm font-semibold text-zig-text transition-all hover:border-zig-orange/40 hover:text-zig-text-bright"
              >
                浏览语言文档
              </Link>
            </div>
          </div>

          {/* Right — 5 cols, code preview */}
          <div className="animate-fade-up lg:col-span-5" style={{ ['--index' as string]: 4 }}>
            <div className="relative">
              <div className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-br from-zig-orange/10 to-transparent blur-xl" />
              <div className="rounded-xl border border-zig-border bg-zig-bg-elevated/80 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 border-b border-zig-border px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-500/40" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/40" />
                  <span className="h-3 w-3 rounded-full bg-green-500/40" />
                  <span className="ml-2 font-mono text-xs text-zig-text-muted">hello.zig</span>
                </div>
                <pre className="rounded-t-none border-0">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features — bento grid, not 3-col equal rows ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-zig-text-bright sm:text-4xl">
            为什么选择 Zig
          </h2>
          <p className="mt-3 text-zig-text-muted">
            每一个设计决策都指向同一个目标：让程序员对他们写的代码拥有完全的掌控。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`animate-fade-up card-lift group rounded-xl border border-zig-border bg-zig-surface/40 p-6 hover:border-zig-orange/30 hover:bg-zig-surface/70 ${feature.span}`}
              style={{ ['--index' as string]: i + 5 }}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-zig-orange/10 text-zig-orange transition-colors group-hover:bg-zig-orange/15">
                {feature.icon}
              </div>
              <h3 className="font-display mb-2 text-lg font-semibold text-zig-text-bright">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zig-text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Links — split asymmetric, not 3 equal cards ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Large card — 7 cols */}
          <Link
            to="/install"
            className="animate-fade-up card-lift group relative overflow-hidden rounded-2xl border border-zig-border bg-zig-surface/40 p-8 hover:border-zig-orange/30 lg:col-span-7"
            style={{ ['--index' as string]: 0 }}
          >
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-zig-orange/5 blur-3xl transition-opacity group-hover:opacity-70" />
            <div className="relative">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zig-orange/10 text-zig-orange">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-zig-text-bright">安装 Zig</h3>
              <p className="mt-2 max-w-[45ch] text-sm leading-relaxed text-zig-text-muted">
                下载预编译二进制文件——解压即用，无需全局安装。或通过 Homebrew、pacman、dnf 等包管理器一键安装。
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-zig-orange transition-transform group-hover:translate-x-1">
                查看安装指南 →
              </span>
            </div>
          </Link>

          {/* Right column — 5 cols, stacked */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Link
              to="/build"
              className="animate-fade-up card-lift group rounded-2xl border border-zig-border bg-zig-surface/40 p-6 hover:border-zig-orange/30"
              style={{ ['--index' as string]: 1 }}
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zig-orange/10 text-zig-orange">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-zig-text-bright">从源码构建</h3>
                  <p className="mt-1 text-sm text-zig-text-muted">CMake + Ninja 或 zig build，全平台支持</p>
                </div>
              </div>
            </Link>

            <Link
              to="/contribute"
              className="animate-fade-up card-lift group rounded-2xl border border-zig-border bg-zig-surface/40 p-6 hover:border-zig-orange/30"
              style={{ ['--index' as string]: 2 }}
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zig-orange/10 text-zig-orange">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-zig-text-bright">参与贡献</h3>
                  <p className="mt-1 text-sm text-zig-text-muted">编写项目、撰写文章或提交补丁</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="animate-fade-up relative overflow-hidden rounded-2xl border border-zig-border bg-zig-surface/30 p-10 sm:p-16" style={{ ['--index' as string]: 0 }}>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-zig-orange to-zig-orange-dark" />
          <div className="absolute right-10 top-0 -z-10 h-40 w-80 rounded-full bg-zig-orange/8 blur-[80px]" />
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-zig-text-bright sm:text-4xl">
              准备好开始了吗
            </h2>
            <p className="mt-3 text-zig-text-muted">
              加入不断增长的 Zig 社区，开始用一种真正不同的方式思考编程。没有运行时开销，没有隐藏的行为——只有纯粹的掌控力。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://ziglang.org/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile rounded-xl bg-zig-orange px-7 py-3.5 text-sm font-semibold text-zig-bg shadow-lg shadow-zig-orange/15 transition-all hover:bg-zig-orange-light"
              >
                下载最新版本
              </a>
              <a
                href="https://ziglang.org/community/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile rounded-xl border border-zig-border bg-zig-surface/50 px-7 py-3.5 text-sm font-semibold text-zig-text transition-all hover:border-zig-orange/40 hover:text-zig-text-bright"
              >
                加入社区讨论
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
