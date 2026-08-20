import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import CodeBlock from '../components/CodeBlock'
import {
  Wrench,
  CheckCircle2,
  Zap,
  Terminal,
} from 'lucide-react'

interface Tab {
  id: string
  label: string
  subtitle: string
}

const tabs: Tab[] = [
  { id: 'cmake', label: '标准 CMake 构建', subtitle: '全功能 Stage3 编译器' },
  { id: 'no-llvm', label: '不使用 LLVM (轻量)', subtitle: '单 C 编译器引导' },
  { id: 'prebuilt', label: '使用预构建 Zig', subtitle: '快速自举' },
  { id: 'windows', label: 'Windows 构建指南', subtitle: 'MSVC / DevKit' },
  { id: 'llvm', label: '从源码构建 LLVM 22.x', subtitle: '开发库编译' },
]

export default function Build() {
  const [activeTab, setActiveTab] = useState('cmake')

  return (
    <PageLayout
      title="从源码构建 Zig 编译器"
      description="详尽的源码编译指南——从标准 CMake + LLVM 构建，到无需 LLVM 的轻量 C 编译器自举。"
      badge="编译器开发"
    >
      {/* ── Prerequisites ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            前置编译环境依赖
          </h2>
        </div>
        <p className="mb-6 text-sm text-zinc-400">
          在开始编译之前，请确认您的系统已安装以下基础构建套件：
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
            <div className="flex items-center gap-2 mb-2 font-display font-semibold text-zinc-100">
              <span className="flex h-2 w-2 rounded-full bg-zig-orange" />
              <span>CMake &gt;= 3.15</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              跨平台构建系统。强烈建议配合 <strong>Ninja</strong> 使用，比传统 Make 速度快数倍。
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
            <div className="flex items-center gap-2 mb-2 font-display font-semibold text-zinc-100">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
              <span>C/C++ 主机工具链</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              系统原生 GCC、Clang 或 MSVC 编译器均可支持。
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
            <div className="flex items-center gap-2 mb-2 font-display font-semibold text-zinc-100">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>LLVM, Clang, LLD (22.x)</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              用于生成全功能 Stage3 编译器后端优化库。如系统未带可参考下方 LLVM 编译标签。
            </p>
          </div>
        </div>
      </section>

      {/* ── Build Methods Tabs ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            选择构建方案
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 overflow-x-auto mb-6">
          {tabs.map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-start rounded-xl px-4 py-2.5 text-left transition-all ${
                  active
                    ? 'border border-zig-orange bg-zig-orange/15 text-zinc-100 shadow-md shadow-zig-orange/10'
                    : 'border border-transparent text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{tab.label}</span>
                <span className="text-[11px] opacity-70 font-mono">{tab.subtitle}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Contents */}
        <div className="rounded-2xl border border-zinc-700 bg-[#141422] p-6 sm:p-8 shadow-2xl">
          {activeTab === 'cmake' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  标准 CMake 构建流程 (推荐)
                </h3>
                <p className="text-sm text-zinc-400">
                  这是最标准也是最通用的构建方式。在安装好 LLVM 22.x 库后执行：
                </p>
              </div>

              <CodeBlock lang="sh" title="标准编译与安装步骤">
{`mkdir build
cd build
cmake .. -GNinja -DCMAKE_BUILD_TYPE=Release
ninja install`}
              </CodeBlock>

              <p className="text-sm text-zinc-400">
                如果系统将 LLVM 安装在非默认路径，可通过 <code>CMAKE_PREFIX_PATH</code> 指定路径：
              </p>

              <CodeBlock lang="sh" title="显式指定 LLVM 库路径">
{`cmake .. -GNinja -DCMAKE_PREFIX_PATH=/path/to/llvm -DCMAKE_BUILD_TYPE=Release
ninja install`}
              </CodeBlock>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <p className="text-xs sm:text-sm text-emerald-200">
                  编译成功后，将在 <code>stage3/bin/zig</code> 产出由 Zig 自身编译出的完整编译器产物。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'no-llvm' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  不依赖 LLVM 的轻量级 Bootstrap 构建
                </h3>
                <p className="text-sm text-zinc-400">
                  该模式下唯一的系统依赖只是一个极简的 C 编译器（如 GCC 或 Clang）。它将源码仓库中的 <code>bootstrap.c</code> 编译为引导程序。
                </p>
              </div>

              <CodeBlock lang="sh" title="单 C 文件快速引导">
{`cc -o bootstrap bootstrap.c
./bootstrap`}
              </CodeBlock>

              <p className="text-sm text-zinc-400">
                该命令会在当前目录下直接生成 <code>zig2</code> 可执行文件。这是 Stage2 版本的编译器，具有 Zig 原生自托管后端，编译速度极快！
              </p>

              <div className="rounded-xl border border-zinc-800 bg-[#171726] p-5">
                <h4 className="font-display text-sm font-semibold text-zinc-200 mb-3">
                  ⚠️ Stage2 (无 LLVM) 特性边界说明：
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">•</span>
                    <span>支持快速 Debug 构建与自举调试</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">•</span>
                    <span>支持生成 C 源码后端代码</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">✕</span>
                    <span>暂不包含部分 LLVM 深度 Release 优化</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">✕</span>
                    <span>部分复杂的跨平台 ELF/PE 深度链接特性</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prebuilt' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  使用预构建的 Zig 编译器从源码构建
                </h3>
                <p className="text-sm text-zinc-400">
                  使用现有的二进制 <code>zig</code> 来构建最新的 Zig 编译器代码：
                </p>
              </div>

              <CodeBlock lang="sh" title="预构建 Zig 构建指令">
{`"$ZIG_PREFIX/zig" build \\
  -p stage3 \\
  --search-prefix "$LLVM_PREFIX" \\
  --zig-lib-dir "lib" \\
  -Dstatic-llvm \\
  -Doptimize=ReleaseSafe`}
              </CodeBlock>

              <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4">
                <p className="text-xs sm:text-sm text-zinc-300">
                  💡 推荐配合 <strong>zig-bootstrap</strong> 工具链仓库，一键为你自动下载与配置好 <code>$LLVM_PREFIX</code> 路径。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'windows' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  Windows 平台编译指南
                </h3>
                <p className="text-sm text-zinc-400">
                  支持使用官方提供的 Windows DevKit 或 Microsoft Visual Studio MSVC 工具链编译。
                </p>
              </div>

              <div className="rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
                <h4 className="font-display text-sm font-semibold text-zinc-200 mb-2">
                  方案 A: CMake + Ninja + Windows DevKit (推荐)
                </h4>
                <CodeBlock lang="bat" title="Windows DevKit 构建">
{`mkdir build
cd build
set DEVKIT=C:\\path\\to\\devkit

cmake .. -GNinja ^
  -DCMAKE_PREFIX_PATH="%DEVKIT%" ^
  -DCMAKE_C_COMPILER="%DEVKIT%\\bin\\zig.exe;cc" ^
  -DCMAKE_CXX_COMPILER="%DEVKIT%\\bin\\zig.exe;c++" ^
  -DZIG_STATIC=ON ^
  -DCMAKE_BUILD_TYPE=Release

ninja install`}
                </CodeBlock>
              </div>

              <div className="rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
                <h4 className="font-display text-sm font-semibold text-zinc-200 mb-2">
                  方案 B: 使用 Visual Studio 2019 / 2022 MSVC
                </h4>
                <p className="text-xs text-zinc-400 mb-2">
                  需在 Visual Studio Installer 中勾选「使用 C++ 的桌面开发」及「C++ ATL」。
                </p>
                <CodeBlock lang="bat" title="MSVC 构建">
{`mkdir build-release
cd build-release
cmake .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_BUILD_TYPE=Release
msbuild -p:Configuration=Release INSTALL.vcxproj`}
                </CodeBlock>
              </div>
            </div>
          )}

          {activeTab === 'llvm' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  从源码构建 LLVM 22.x 开发库 (POSIX 系统)
                </h3>
                <p className="text-sm text-zinc-400">
                  如果你使用的 Linux / macOS 包管理器中没有匹配的 LLVM 22.x 开发头文件库，可按以下标准步骤编译：
                </p>
              </div>

              <CodeBlock lang="sh" title="LLVM Release 快速构建">
{`git clone --depth 1 --branch release/22.x https://github.com/llvm/llvm-project llvm-project-22
cd llvm-project-22

mkdir build-release && cd build-release
cmake ../llvm \\
  -DCMAKE_INSTALL_PREFIX=$HOME/local/llvm22-assert \\
  -DCMAKE_BUILD_TYPE=Release \\
  -DLLVM_ENABLE_PROJECTS="lld;clang" \\
  -DLLVM_ENABLE_LIBXML2=OFF \\
  -DLLVM_ENABLE_TERMINFO=OFF \\
  -DLLVM_ENABLE_ASSERTIONS=ON \\
  -G Ninja

ninja install`}
              </CodeBlock>
            </div>
          )}
        </div>
      </section>

      {/* ── Speed up tricks ── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-6 w-6 text-zig-orange" />
          <h2 className="font-display text-2xl font-bold text-zinc-100">
            加速编译器重编译的实用技巧
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
            <h4 className="font-display font-semibold text-zinc-100 mb-1 flex items-center gap-1.5">
              <span className="text-zig-orange">⚡</span>
              <span>-DZIG_NO_LIB=ON</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              阻止构建系统每次将 <code>lib/</code> 复制到安装前缀，使编译器直接引用源码树中的标准库，修改标准库代码即刻生效无需重新 install。
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700/80 bg-[#161626] p-5">
            <h4 className="font-display font-semibold text-zinc-100 mb-1 flex items-center gap-1.5">
              <span className="text-cyan-400">⚡</span>
              <span>--watch -fincremental</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              开启文件监控与增量编译模式，文件保存时仅耗费数十毫秒即可重新构建产物。
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
