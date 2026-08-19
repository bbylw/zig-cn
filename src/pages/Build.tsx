import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import CodeBlock from '../components/CodeBlock'

interface Tab {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: 'cmake', label: '标准 CMake 构建' },
  { id: 'no-llvm', label: '不使用 LLVM' },
  { id: 'prebuilt', label: '使用预构建 Zig' },
  { id: 'windows', label: 'Windows 构建' },
  { id: 'llvm', label: '构建 LLVM/Clang/LLD' },
]

export default function Build() {
  const [activeTab, setActiveTab] = useState('cmake')

  return (
    <PageLayout
      title="从源码构建 Zig"
      description="多种方式从源码编译 Zig 编译器——从标准 CMake 构建到不使用 LLVM 的轻量构建。"
    >
      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">前置依赖</h2>
        <p className="mb-4 text-zig-text-muted">请先确保已具备以下依赖：</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <span className="mt-0.5 text-zig-orange">•</span>
            <div>
              <h4 className="font-display font-semibold text-zig-text-bright">CMake &gt;= 3.15</h4>
              <p className="text-sm text-zig-text-muted">构建系统，推荐配合 Ninja 使用以加快编译速度</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <span className="mt-0.5 text-zig-orange">•</span>
            <div>
              <h4 className="font-display font-semibold text-zig-text-bright">系统 C/C++ 工具链</h4>
              <p className="text-sm text-zig-text-muted">GCC、Clang 或 MSVC 均可</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <span className="mt-0.5 text-zig-orange">•</span>
            <div>
              <h4 className="font-display font-semibold text-zig-text-bright">LLVM、Clang、LLD 开发库（版本 22.x）</h4>
              <p className="text-sm text-zig-text-muted">
                使用与系统相同的 C/C++ 工具链编译。如果系统包管理器缺少这些库或配置有误，
                请参阅下方"构建 LLVM/Clang/LLD"部分了解如何从源码构建它们。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Build Methods */}
      <section className="mb-12">
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">构建方式</h2>

        {/* Tab buttons */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-zig-border pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-zig-orange'
                  : 'text-zig-text-muted hover:text-zig-text-bright'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-zig-orange" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-xl border border-zig-border bg-zig-surface/30 p-6">
          {activeTab === 'cmake' && (
            <div>
              <h3 className="font-display mb-4 text-xl font-semibold text-zig-text-bright">标准 CMake 构建流程</h3>
              <p className="mb-4 text-zig-text-muted">
                这是最常见的从源码构建 Zig 的方式。确保已安装 LLVM 22.x 开发库后，
                执行标准的 CMake 构建流程：
              </p>
              <CodeBlock lang="sh" title="标准构建">
{`mkdir build
cd build
cmake ..
make install`}
              </CodeBlock>
              <p className="mt-4 text-zig-text-muted">
                如有需要，可用 <code>CMAKE_PREFIX_PATH</code> 帮助 CMake 找到 LLVM：
              </p>
              <CodeBlock lang="sh" title="指定 LLVM 路径">
{`cmake .. -DCMAKE_PREFIX_PATH=/path/to/llvm`}
              </CodeBlock>
              <div className="mt-4 rounded-lg border border-zig-orange/30 bg-zig-orange/5 p-4">
                <p className="text-sm text-zig-text">
                  ✅ 这会生成 <code>stage3/bin/zig</code>，即由 Zig 自身构建出的 Zig 编译器。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'no-llvm' && (
            <div>
              <h3 className="font-display mb-4 text-xl font-semibold text-zig-text-bright">不使用 LLVM 从源码构建</h3>
              <p className="mb-4 text-zig-text-muted">
                在这种情况下，唯一的系统依赖是一个 C 编译器。它把仓库中的
                <code>bootstrap.c</code> 源文件编译成一个引导用的可执行文件。
              </p>
              <CodeBlock lang="sh" title="引导构建">
{`cc -o bootstrap bootstrap.c
./bootstrap`}
              </CodeBlock>
              <p className="mt-4 text-zig-text-muted">
                这会在当前工作目录下生成一个 <code>zig2</code> 可执行文件。
                这是编译器的 "stage2" 构建版本，不包含 LLVM 扩展，因此缺少以下特性：
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  'Release 模式优化',
                  '部分 ELF 链接特性',
                  '部分 COFF/PE 链接特性',
                  '部分 WebAssembly 链接特性',
                  '从目标文件创建静态归档的能力',
                  '编译汇编文件的能力',
                  '编译 C/C++/Obj-C/Obj-C++ 文件的能力',
                ].map((limit) => (
                  <div key={limit} className="flex items-center gap-2 text-sm text-zig-text-muted">
                    <span className="text-red-400">✕</span>
                    {limit}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-zig-text-muted">
                即便如此，Zig 仍提供 LLVM 后端（可生成 bitcode 文件）和 C 后端
                （可生成 C 源代码），但需要单独安装 Clang 或 C 编译器进行后续处理。
              </p>
              <p className="mt-4 text-zig-text-muted">
                从这里起，你可以把玩 <code>zig2</code>，也可以继续使用构建系统完成安装：
              </p>
              <CodeBlock lang="sh" title="继续安装">
{`./zig2 build`}
              </CodeBlock>
              <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
                <p className="text-sm text-zig-text">
                  ⚠️ 由于上述限制，建议在问题解决之前不要进行这一步。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'prebuilt' && (
            <div>
              <h3 className="font-display mb-4 text-xl font-semibold text-zig-text-bright">使用预构建的 Zig 从源码构建</h3>
              <p className="mb-4 text-zig-text-muted">
                依赖项：
              </p>
              <ul className="mb-4 space-y-2 text-zig-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  一个较新的、先前构建出的 Zig。所需版本取决于近期是否发生过破坏性变更。
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zig-orange">•</span>
                  使用 Zig 构建出的 LLVM、Clang 和 LLD 库。
                </li>
              </ul>
              <p className="mb-4 text-zig-text-muted">
                获取这两份产物最简单的方式是使用 <strong className="text-zig-orange-light">zig-bootstrap</strong>，
               它会创建 <code>out/zig-$target-$cpu</code> 和 <code>out/$target-$cpu</code> 目录。
              </p>
              <CodeBlock lang="sh" title="使用预构建 Zig 构建">
{`"$ZIG_PREFIX/zig" build \\
  -p stage3 \\
  --search-prefix "$LLVM_PREFIX" \\
  --zig-lib-dir "lib" \\
  -Dstatic-llvm`}
              </CodeBlock>
              <p className="mt-4 text-zig-text-muted">
                其中 <code>$LLVM_PREFIX</code> 是包含（例如）
                <code>include/llvm/Pass.h</code> 和 <code>lib/libLLVMCore.a</code> 的路径。
              </p>
              <div className="mt-4 rounded-lg border border-zig-orange/30 bg-zig-orange/5 p-4">
                <p className="text-sm text-zig-text">
                  ✅ 这会生成 <code>stage3/bin/zig</code>。可运行 <code>zig build -h</code> 了解可传入的选项，
                  例如 <code>-Drelease</code>。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'windows' && (
            <div>
              <h3 className="font-display mb-4 text-xl font-semibold text-zig-text-bright">在 Windows 上从源码构建</h3>

              <h4 className="font-display mb-3 text-lg font-semibold text-zig-orange-light">方案一：使用 Windows Zig 编译器开发套件（Dev Kit）</h4>
              <p className="mb-4 text-zig-text-muted">
                好处是 LLVM、LLD 和 Clang 以 Release 模式构建，Zig 构建可选 Debug。
                完全独立于 MSVC 工作。
              </p>
              <p className="mb-2 text-zig-text-muted">
                通过查看 CI 脚本确定下载 URL，格式类似：
              </p>
              <CodeBlock lang="text" title="Dev Kit 下载 URL">
{`https://ziglang.org/deps/zig+llvm+lld+clang-x86_64-windows-gnu-$VERSION.zip`}
              </CodeBlock>

              <h4 className="font-display mb-3 mt-6 text-lg font-semibold text-zig-orange-light">方案 1a：CMake + Ninja</h4>
              <p className="mb-4 text-zig-text-muted">
                解压开发套件，然后在 Zig 源码目录下执行：
              </p>
              <CodeBlock lang="bat" title="CMake + Ninja 构建">
{`mkdir build
cd build
set DEVKIT=$DEVKIT

cmake .. -GNinja \\
  -DCMAKE_PREFIX_PATH="%DEVKIT%" \\
  -DCMAKE_C_COMPILER="%DEVKIT%/bin/zig.exe;cc" \\
  -DCMAKE_CXX_COMPILER="%DEVKIT%/bin/zig.exe;c++" \\
  -DCMAKE_AR="%DEVKIT%/bin/zig.exe" \\
  -DZIG_AR_WORKAROUND=ON -DZIG_STATIC=ON \\
  -DZIG_USE_LLVM_CONFIG=OFF

ninja install`}
              </CodeBlock>
              <ul className="mb-6 space-y-1 text-sm text-zig-text-muted">
                <li>• 追加 <code>-DCMAKE_BUILD_TYPE=Release</code> 可构建 Release 版本</li>
                <li>• 追加 <code>-DZIG_NO_LIB=ON</code> 以避免出现多份 lib/ 文件夹副本</li>
              </ul>

              <h4 className="font-display mb-3 text-lg font-semibold text-zig-orange-light">方案 1b：zig build</h4>
              <CodeBlock lang="bat" title="zig build 构建">
{`$DEVKIT\\bin\\zig.exe build -p stage3 --search-prefix $DEVKIT --zig-lib-dir lib -Dstatic-llvm -Duse-zig-libcxx -Dtarget=x86_64-windows-gnu`}
              </CodeBlock>
              <p className="mt-2 text-sm text-zig-text-muted">
                追加 <code>-Doptimize=ReleaseSafe</code> 可构建 Release 版本。
              </p>

              <h4 className="font-display mb-3 mt-6 text-lg font-semibold text-zig-orange-light">方案二：使用 CMake 和 Microsoft Visual Studio</h4>
              <p className="mb-4 text-zig-text-muted">
                好处是语言或构建系统的变更不会破坏开发套件，可用于升级开发套件。
              </p>
              <p className="mb-2 text-zig-text-muted">前置条件：</p>
              <ul className="mb-4 space-y-1 text-sm text-zig-text-muted">
                <li>• 安装 <strong>Visual Studio 2019 生成工具</strong>，选择"使用 C++ 的桌面开发"</li>
                <li>• 必须勾选 <strong>C++ ATL for v142 生成工具</strong> 可选组件</li>
                <li>• 安装 CMake</li>
                <li>• 使用 git 克隆 zig 仓库到不含空格的路径</li>
              </ul>
              <CodeBlock lang="bat" title="MSVC 构建">
{`mkdir C:\\Users\\Andy\\zig\\build-release
cd C:\\Users\\Andy\\zig\\build-release
"c:\\Program Files\\CMake\\bin\\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_PREFIX_PATH=C:\\Users\\Andy\\llvm+clang+lld-20.0.0-x86_64-windows-msvc-release-mt -DCMAKE_BUILD_TYPE=Release
msbuild -p:Configuration=Release INSTALL.vcxproj`}
              </CodeBlock>
              <div className="mt-4 rounded-lg border border-zig-orange/30 bg-zig-orange/5 p-4">
                <p className="text-sm text-zig-text">
                  ✅ 现在你已在 <code>bin\\zig.exe</code> 得到二进制文件，可运行
                  <code>bin\\zig.exe build test</code> 测试。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'llvm' && (
            <div>
              <h3 className="font-display mb-4 text-xl font-semibold text-zig-text-bright">从源码构建 LLVM、LLD 和 Clang</h3>

              <h4 className="font-display mb-3 text-lg font-semibold text-zig-orange-light">POSIX 系统（Release 推荐）</h4>
              <CodeBlock lang="sh" title="Release 构建 (POSIX)">
{`cd ~/Downloads
git clone --depth 1 --branch release/22.x https://github.com/llvm/llvm-project llvm-project-22
cd llvm-project-22
git checkout release/22.x

mkdir build-release
cd build-release
cmake ../llvm \\
  -DCMAKE_INSTALL_PREFIX=$HOME/local/llvm22-assert \\
  -DCMAKE_BUILD_TYPE=Release \\
  -DLLVM_ENABLE_PROJECTS="lld;clang" \\
  -DLLVM_ENABLE_LIBXML2=OFF \\
  -DLLVM_ENABLE_TERMINFO=OFF \\
  -DLLVM_ENABLE_LIBEDIT=OFF \\
  -DLLVM_ENABLE_ASSERTIONS=ON \\
  -DLLVM_PARALLEL_LINK_JOBS=1 \\
  -G Ninja
ninja install`}
              </CodeBlock>

              <h4 className="font-display mb-3 mt-6 text-lg font-semibold text-zig-orange-light">Windows</h4>
              <p className="mb-4 text-zig-text-muted">
                下载 LLVM、Clang 和 LLD 源码（版本 22.x），分别解压到各自的目录。
                安装 Visual Studio 2019 生成工具（需勾选 C++ ATL）和 Python 3。
              </p>
              <p className="mb-2 text-sm font-semibold text-zig-text">LLVM Release 构建：</p>
              <CodeBlock lang="bat" title="LLVM Release (Windows)">
{`mkdir C:\\Users\\Andy\\llvm-22.0.0.src\\build-release
cd C:\\Users\\Andy\\llvm-22.0.0.src\\build-release
"c:\\Program Files\\CMake\\bin\\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\\Users\\Andy\\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_PREFIX_PATH=C:\\Users\\Andy\\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DLLVM_ENABLE_ZLIB=OFF -DCMAKE_BUILD_TYPE=Release -DLLVM_ENABLE_LIBXML2=OFF -DLLVM_USE_CRT_RELEASE=MT
msbuild /m -p:Configuration=Release INSTALL.vcxproj`}
              </CodeBlock>

              <p className="mb-2 mt-4 text-sm font-semibold text-zig-text">LLD Release 构建：</p>
              <CodeBlock lang="bat" title="LLD Release (Windows)">
{`mkdir C:\\Users\\Andy\\lld-22.0.0.src\\build-release
cd C:\\Users\\Andy\\lld-22.0.0.src\\build-release
"c:\\Program Files\\CMake\\bin\\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\\Users\\Andy\\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_PREFIX_PATH=C:\\Users\\Andy\\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_BUILD_TYPE=Release -DLLVM_USE_CRT_RELEASE=MT
msbuild /m -p:Configuration=Release INSTALL.vcxproj`}
              </CodeBlock>

              <p className="mb-2 mt-4 text-sm font-semibold text-zig-text">Clang Release 构建：</p>
              <CodeBlock lang="bat" title="Clang Release (Windows)">
{`mkdir C:\\Users\\Andy\\clang-22.0.0.src\\build-release
cd C:\\Users\\Andy\\clang-22.0.0.src\\build-release
"c:\\Program Files\\CMake\\bin\\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\\Users\\Andy\\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_PREFIX_PATH=C:\\Users\\Andy\\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_BUILD_TYPE=Release -DLLVM_USE_CRT_RELEASE=MT
msbuild /m -p:Configuration=Release INSTALL.vcxproj`}
              </CodeBlock>

              <div className="mt-6 rounded-lg border border-zig-border bg-zig-surface/40 p-4">
                <p className="text-sm text-zig-text">
                  构建完成后，将以下参数加入 Zig 的 CMake 命令中：
                  <code>-DCMAKE_PREFIX_PATH=$HOME/local/llvm22-assert</code>（Release）或
                  <code>-DCMAKE_PREFIX_PATH=$HOME/local/llvm22-debug</code>（Debug）
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="font-display mb-4 text-2xl font-semibold text-zig-text-bright">加速构建的技巧</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <h4 className="font-display mb-2 font-semibold text-zig-orange-light">使用 Ninja</h4>
            <p className="text-sm text-zig-text-muted">
              在 CMake 配置中加上 <code>-GNinja</code>，Ninja 比 Make 更快、更易用。
            </p>
          </div>
          <div className="rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <h4 className="font-display mb-2 font-semibold text-zig-orange-light">Release 模式</h4>
            <p className="text-sm text-zig-text-muted">
              加上 <code>-DCMAKE_BUILD_TYPE=Release</code> 加快 zig 的重新编译速度。
            </p>
          </div>
          <div className="rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <h4 className="font-display mb-2 font-semibold text-zig-orange-light">避免复制 lib/</h4>
            <p className="text-sm text-zig-text-muted">
              加上 <code>-DZIG_NO_LIB=ON</code>，让 zig 直接使用源码树中的 lib/，
              修改后无需重新运行 install。
            </p>
          </div>
          <div className="rounded-lg border border-zig-border bg-zig-surface/40 p-4">
            <h4 className="font-display mb-2 font-semibold text-zig-orange-light">增量编译</h4>
            <p className="text-sm text-zig-text-muted">
              使用 <code>--watch -fincremental</code> 启用增量编译，带来近乎即时的重新构建。
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
