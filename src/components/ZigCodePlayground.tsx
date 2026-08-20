import { useState } from 'react'
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, Cpu, ShieldCheck } from 'lucide-react'
import confetti from 'canvas-confetti'

interface CodeSample {
  id: string
  title: string
  subtitle: string
  tag: string
  code: string
  output: string
  duration: string
  memory: string
  description: string
}

const SAMPLES: CodeSample[] = [
  {
    id: 'hello',
    title: 'Hello & 显式内存管理',
    subtitle: '没有隐藏的控制流与隐藏分配',
    tag: '基础与分配器',
    description: 'Zig 没有隐藏的内存分配。所有分配都通过显式的 Allocator 参数传递，并使用 defer 保证确定性释放。',
    code: `const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("⚡ 欢迎来到 Zig 编程语言的世界！\\n", .{});

    // 显式通用目的分配器，自动检测内存泄漏
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer {
        const check = gpa.deinit();
        if (check == .leak) @panic("检测到内存泄漏！");
    }
    const allocator = gpa.allocator();

    // 动态列表构建
    var list = std.ArrayList([]const u8).init(allocator);
    defer list.deinit(); // 作用域结束时自动释放

    try list.append("健壮 (Robust)");
    try list.append("最优 (Optimal)");
    try list.append("可复用 (Reusable)");

    try stdout.print("Zig 的核心价值观:\\n", .{});
    for (list.items, 0..) |item, i| {
        try stdout.print("  [{d}] {s}\\n", .{ i + 1, item });
    }
}`,
    output: `⚡ 欢迎来到 Zig 编程语言的世界！
Zig 的核心价值观:
  [1] 健壮 (Robust)
  [2] 最优 (Optimal)
  [3] 可复用 (Reusable)

✔ 0 字节泄漏 (GeneralPurposeAllocator 内存检测通过)`,
    duration: '0.002s',
    memory: '14.2 KB',
  },
  {
    id: 'errors',
    title: '错误集与 defer',
    subtitle: '显式且完备的错误处理',
    tag: '错误与安全',
    description: '没有异常机制（Exception）。错误是联合类型中的值，通过 try / catch 和 errdefer 实现清晰优雅的资源回滚。',
    code: `const std = @import("std");

const FileError = error{
    NotFound,
    PermissionDenied,
    DeviceBusy,
};

fn parseConfig(path: []const u8) FileError!u32 {
    if (std.mem.eql(u8, path, "invalid")) {
        return FileError.NotFound;
    }
    return 42; // 解析成功的配置端口
}

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    
    // 正常路径
    const port = try parseConfig("server.conf");
    try stdout.print("服务启动成功，监听端口: {d}\\n", .{port});

    // 错误捕获处理
    const bad_result = parseConfig("invalid") catch |err| {
        try stdout.print("处理失败 (已优雅降级): {s}\\n", .{@errorName(err)});
        return;
    };
    _ = bad_result;
}`,
    output: `服务启动成功，监听端口: 42
处理失败 (已优雅降级): NotFound

✔ 所有错误分支已被编译器强制处理完毕`,
    duration: '0.001s',
    memory: '8.4 KB',
  },
  {
    id: 'comptime',
    title: 'Comptime 编译期计算',
    subtitle: '无需宏系统即可实现强大的元编程',
    tag: '编译期元编程',
    description: '在编译期运行常规 Zig 代码。类型本身是一等公民（First-class Value），用普通函数即可实现泛型数据结构。',
    code: `const std = @import("std");

// 泛型函数：返回任意类型的两数最大值
fn max(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}

// 编译期斐波那契计算（零运行时开销）
fn fibonacci(comptime n: usize) usize {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();

    // 泛型调用
    const m1 = max(f32, 3.14, 2.71);
    const m2 = max(i64, -100, 42);

    // fibonacci(20) 完全在编译阶段折叠为常量 6765
    comptime var precomputed = fibonacci(20);

    try stdout.print("max(f32) = {d:.2}\\n", .{m1});
    try stdout.print("max(i64) = {d}\\n", .{m2});
    try stdout.print("编译期预计算 Fib(20) = {d} (0 运行时耗时)\\n", .{precomputed});
}`,
    output: `max(f32) = 3.14
max(i64) = 42
编译期预计算 Fib(20) = 6765 (0 运行时耗时)

✔ Comptime 常量折叠生效，二进制体积极小`,
    duration: '0.000s',
    memory: '4.1 KB',
  },
  {
    id: 'c_interop',
    title: '无缝 C 语言互操作',
    subtitle: '直接 @cImport 引入 C 头文件',
    tag: 'C/C++ 无缝整合',
    description: 'Zig 可直接解析 C 语言头文件，无需编写繁琐的 FFI 胶水代码，同时自身可作为开箱即用的高性能 C/C++ 编译器。',
    code: `const std = @import("std");

// 直接引入 C 标准库或系统头文件
const c = @cImport({
    @cInclude("math.h");
    @cInclude("stdio.h");
});

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();

    // 调用 C 语言原生数学库
    const angle_deg: f64 = 45.0;
    const rad = angle_deg * (std.math.pi / 180.0);
    const sin_val = c.sin(rad);

    try stdout.print("C math.h 计算结果: sin(45°) = {d:.6}\\n", .{sin_val});
    try stdout.print("Zig 编译指令: zig build-exe main.zig -lc\\n", .{});
}`,
    output: `C math.h 计算结果: sin(45°) = 0.707107
Zig 编译指令: zig build-exe main.zig -lc

✔ 完美链接原生 libc，无任何运行时封装开销`,
    duration: '0.003s',
    memory: '18.6 KB',
  },
]

export default function ZigCodePlayground() {
  const [activeId, setActiveId] = useState('hello')
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentSample = SAMPLES.find((s) => s.id === activeId) || SAMPLES[0]

  const handleRun = () => {
    setIsRunning(true)
    setHasRun(false)
    setTimeout(() => {
      setIsRunning(false)
      setHasRun(true)
      confetti({
        particleCount: 28,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#F7A41D', '#FFAE34', '#60A5FA', '#34D399'],
      })
    }, 450)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentSample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Glow backdrop */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-zig-orange/20 via-amber-500/10 to-indigo-500/15 blur-2xl opacity-60 pointer-events-none" />

      <div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-[#141420] shadow-2xl">
        {/* Top Feature Selector Tabs */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-[#181826] px-4 py-3 sm:px-6 overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SAMPLES.map((sample) => {
              const active = sample.id === activeId
              return (
                <button
                  key={sample.id}
                  onClick={() => {
                    setActiveId(sample.id)
                    setHasRun(false)
                  }}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                    active
                      ? 'bg-zig-orange/15 text-zig-orange border border-zig-orange/30 shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  <span>{sample.title.split(' ')[0]}</span>
                  <span className="hidden md:inline text-[11px] opacity-75 font-mono">
                    ({sample.tag})
                  </span>
                </button>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Zig v0.14.0 target: native</span>
          </div>
        </div>

        {/* Info banner */}
        <div className="border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-2.5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-zig-orange shrink-0" />
            <span>{currentSample.description}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <Cpu className="h-3 w-3 text-cyan-400" />
              零运行时开销
            </span>
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              内存安全
            </span>
          </div>
        </div>

        {/* Code + Terminal Split / Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
          {/* Code Left/Main (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-[#11111a]">
            <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#141422] px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-400">
                  src/{currentSample.id}.zig
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded bg-zinc-800/90 px-2 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[11px]">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-zinc-400" />
                      <span className="font-mono text-[11px]">复制源码</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 rounded-lg bg-zig-orange px-3.5 py-1 text-xs font-semibold text-zinc-950 shadow-md shadow-zig-orange/20 transition-all hover:bg-zig-orange-light active:scale-95 disabled:opacity-50"
                >
                  <Play className={`h-3 w-3 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
                  <span>{isRunning ? '编译中...' : '模拟运行 (zig run)'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 overflow-x-auto text-[13px] leading-relaxed font-mono text-zinc-200">
              <pre className="!bg-transparent !p-0 !m-0 !border-0 whitespace-pre">
                {currentSample.code}
              </pre>
            </div>
          </div>

          {/* Terminal / Output Right (5 cols) */}
          <div className="lg:col-span-5 flex flex-col bg-[#0d0d16]">
            <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#12121e] px-4 py-2">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Terminal className="h-3.5 w-3.5 text-zig-orange" />
                <span>终端输出 ($ zig run)</span>
              </div>
              <button
                onClick={() => setHasRun(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                title="清空输出"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>

            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between font-mono text-xs space-y-4 min-h-[220px]">
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-3 text-[11px]">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span>zig run src/{currentSample.id}.zig --summary all</span>
                </div>

                {isRunning ? (
                  <div className="flex items-center gap-2 text-zinc-400 py-6">
                    <span className="h-3 w-3 rounded-full border-2 border-zig-orange border-t-transparent animate-spin" />
                    <span>Clang LLVM 后端优化与编译中...</span>
                  </div>
                ) : hasRun ? (
                  <div className="animate-fade-up whitespace-pre-wrap text-emerald-300/90 leading-relaxed rounded-lg border border-emerald-900/30 bg-emerald-950/20 p-3">
                    {currentSample.output}
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4 text-zinc-400 text-xs">
                    <p className="text-zinc-300 font-medium mb-1">💡 准备就绪</p>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      点击上方「<strong>模拟运行</strong>」按钮，查看 Zig 编译器在终端的执行日志、内存分配检测和输出结果。
                    </p>
                  </div>
                )}
              </div>

              {/* Execution telemetry */}
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-zinc-500">执行耗时：</span>
                  <span className="text-amber-400 font-semibold ml-1">
                    {hasRun ? currentSample.duration : '--'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">二进制开销：</span>
                  <span className="text-cyan-400 font-semibold ml-1">
                    {hasRun ? currentSample.memory : '--'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
