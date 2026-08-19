![ZIG](https://ziglang.org/img/zig-logo-dynamic.svg)

一种用于编写**健壮**、**最优**且**可复用**软件的通用编程语言及工具链。

https://ziglang.org/

## 文档

如果你是在源码树中查看本 README 文件，请前往[下载页面](https://ziglang.org/download)，根据你所使用的 Zig 版本点击相应链接，查阅对应的**发行说明**、**语言参考**或**标准库文档**。

如果你看到的是 Zig 的某个发行版本，那么可以在 [`doc/langref.html`](https://codeberg.org/ziglang/zig/src/branch/master/doc/langref.html.in) 找到语言参考，并可通过运行 `zig std` 打开一个浏览器标签页来查看标准库文档。

## 安装

 * [下载预编译的二进制文件](https://ziglang.org/download/)
 * [通过包管理器安装](https://ziglang.org/learn/getting-started/#managers)
 * [为任意目标引导构建 Zig](https://codeberg.org/ziglang/zig-bootstrap)

一个 Zig 安装由两部分组成：

1. Zig 可执行文件
2. lib/ 目录

在运行时，可执行文件会在文件系统中相对于自身向上逐级查找 lib/ 目录：

* lib/
* lib/zig/
* ../lib/
* ../lib/zig/
* （依此类推）

换句话说，你可以**把 Zig 的发行包解压到任意位置**，然后立即开始使用。无需全局安装，不过这种机制同样支持全局安装的场景（例如 `/usr/bin/zig` 和 `/usr/lib/zig/`）。

## 从源码构建

请先确保已具备以下依赖：

 * CMake >= 3.15
 * 系统 C/C++ 工具链
 * LLVM、Clang、LLD 开发库，版本 22.x，使用与系统相同的 C/C++ 工具链编译。
   - 如果系统包管理器缺少这些库，或配置有误，请参阅下文了解如何从源码构建它们。

随后即为标准的 CMake 构建流程：

```sh
mkdir build
cd build
cmake ..
make install
```

如有需要，可用 `CMAKE_PREFIX_PATH` 帮助 CMake 找到 LLVM。

这会生成 `stage3/bin/zig`，即由 Zig 自身构建出的 Zig 编译器。

## 不使用 LLVM 从源码构建

在这种情况下，唯一的系统依赖是一个 C 编译器，它把仓库中的 [`bootstrap.c`](https://codeberg.org/ziglang/zig/src/branch/master/bootstrap.c) 源文件编译成一个引导用的可执行文件。

```sh
cc -o bootstrap bootstrap.c
./bootstrap
```

这会在当前工作目录下生成一个 `zig2` 可执行文件。这是编译器的“stage2”构建版本，[不包含 LLVM 扩展](https://github.com/ziglang/zig/issues/16270)，因此缺少以下特性：

- Release 模式优化
- [部分 ELF 链接特性](https://github.com/ziglang/zig/issues/17749)
- [部分 COFF/PE 链接特性](https://github.com/ziglang/zig/issues/17751)
- [部分 WebAssembly 链接特性](https://github.com/ziglang/zig/issues/17750)
- [从目标文件创建静态归档的能力](https://github.com/ziglang/zig/issues/9828)
- [编译汇编文件的能力](https://github.com/ziglang/zig/issues/21169)
- 编译 C、C++、Objective-C 以及 Objective-C++ 文件的能力

即便以这种方式构建，Zig 仍提供一个 LLVM 后端，可生成 bitcode 文件，这些文件可经由单独安装的 Clang 进行优化并编译为目标文件。类似地，Zig 提供一个 C 后端，可生成 C 源代码，这些代码可经由单独安装的 C 编译器工具链进行优化并编译为目标文件。

从这里起，你可以把玩 `zig2`，也可以像往常一样继续使用构建系统完成安装：

```sh
./zig2 build
```

不过，由于上述列出的限制，建议在该问题得到解决之前不要进行这一步：

[彻底消除对 LLVM 库 API 调用的依赖](https://github.com/ziglang/zig/issues/25492)

## 使用预构建的 Zig 从源码构建

依赖项：

 * 一个较新的、先前构建出的 Zig。所需的具体版本取决于近期是否发生过破坏性变更。如果该版本之后语言或标准库变化过大，这种源码构建方式就会失败。
 * 使用 Zig 构建出的 LLVM、Clang 和 LLD 库。

获取这两份产物最简单的方式是使用 [zig-bootstrap](https://codeberg.org/ziglang/zig-bootstrap)，它会创建目录 `out/zig-$target-$cpu` 和 `out/$target-$cpu`，分别用作以下命令中的 `$ZIG_PREFIX` 和 `$LLVM_PREFIX`：

```sh
"$ZIG_PREFIX/zig" build \
  -p stage3 \
  --search-prefix "$LLVM_PREFIX" \
  --zig-lib-dir "lib" \
  -Dstatic-llvm
```

其中 `$LLVM_PREFIX` 是包含（例如）`include/llvm/Pass.h` 和 `lib/libLLVMCore.a` 的路径。

这会生成 `stage3/bin/zig`。可运行 `zig build -h` 了解可传入的选项，例如 `-Drelease`。

## 在 Windows 上从源码构建

### 方案一：使用 Windows Zig 编译器开发套件（Dev Kit）

它的一个好处是 LLVM、LLD 和 Clang 以 Release 模式构建，而你的 Zig 构建则可以选择为 Debug 构建。它还完全独立于 MSVC 工作，因此无需安装 MSVC。

通过[查看 CI 脚本](https://codeberg.org/ziglang/zig/src/branch/master/ci/x86_64-windows-debug.ps1#L1-L4)来确定 URL。它会类似如下形式（把其中的 `$VERSION` 替换为你通过上述链接看到的版本）：

```
https://ziglang.org/deps/zig+llvm+lld+clang-x86_64-windows-gnu-$VERSION.zip
```

这个 zip 文件包含：

 * 一个较旧的 Zig 安装。
 * 版本 16.0.1 的 LLVM、LLD 和 Clang 库（.lib 和 .h 文件），以 Release 模式构建。
 * zlib（.lib 和 .h 文件），v1.2.13，以 Release 模式构建。
 * zstd（.lib 和 .h 文件），v1.5.2，以 Release 模式构建。

#### 方案 1a：CMake + [Ninja](https://ninja-build.org/)

解压开发套件，然后在你的 Zig 源码检出目录下的 cmd.exe 中：

```bat
mkdir build
cd build
set DEVKIT=$DEVKIT
```

把 `$DEVKIT` 替换为你从上面链接下载并解压后的文件夹路径。请务必对所有路径分隔符使用正斜杠（`/`）（否则 CMake 会把反斜杠当作转义符而导致失败）。

然后运行：

```bat
cmake .. -GNinja -DCMAKE_PREFIX_PATH="%DEVKIT%" -DCMAKE_C_COMPILER="%DEVKIT%/bin/zig.exe;cc" -DCMAKE_CXX_COMPILER="%DEVKIT%/bin/zig.exe;c++" -DCMAKE_AR="%DEVKIT%/bin/zig.exe" -DZIG_AR_WORKAROUND=ON -DZIG_STATIC=ON -DZIG_USE_LLVM_CONFIG=OFF
```

 * 追加 `-DCMAKE_BUILD_TYPE=Release` 可构建 Release 版本。
 * 追加 `-DZIG_NO_LIB=ON` 以避免出现多份 lib/ 文件夹副本。

最后运行：

```bat
ninja install
```

现在你已在 `stage3\bin\zig.exe` 得到 `zig.exe` 二进制文件。

#### 方案 1b：zig build

解压开发套件，然后在你的 Zig 源码检出目录下的 cmd.exe 中：

```bat
$DEVKIT\bin\zig.exe build -p stage3 --search-prefix $DEVKIT --zig-lib-dir lib -Dstatic-llvm -Duse-zig-libcxx -Dtarget=x86_64-windows-gnu
```

把 `$DEVKIT` 替换为你从上面链接下载并解压后的文件夹路径。

追加 `-Doptimize=ReleaseSafe` 可构建 Release 版本。

**如果在此步骤构建出错**，很可能是因为开发套件内的 Zig 安装版本过旧，需要更新开发套件。这种情况下还需多一步：

 1. [下载最新的 master 分支 zip 文件](https://ziglang.org/download/#release-master)。
 2. 解压，并用新解压出的 zig.exe 路径替换上述命令中的 zig.exe 路径，同时把 lib\zig 文件夹替换为新内容，然后重试上述命令。

现在你已在 `stage3\bin\zig.exe` 得到 `zig.exe` 二进制文件。

### 方案二：使用 CMake 和 Microsoft Visual Studio

这种方案的好处是，语言或构建系统的变更不会破坏你的开发套件。该方案可用于升级开发套件。

首先，使用 CMake 和 Microsoft Visual Studio 从源码构建 LLVM、LLD 和 Clang（详见下文说明）。

安装 [Visual Studio 2019 生成工具](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2019)。出现提示时务必选择“使用 C++ 的桌面开发”。
 * 你还必须勾选名为 **C++ ATL for v142 生成工具** 的可选组件。

安装 [CMake](http://cmake.org)。

使用 [git](https://git-scm.com/) 将 zig 仓库克隆到一个不含空格的路径，例如 `C:\Users\Andy\zig`。

通过开始菜单，运行 **x64 Native Tools Command Prompt for VS 2019**，并执行以下命令，将 `C:\Users\Andy` 替换为正确的值。

```bat
mkdir C:\Users\Andy\zig\build-release
cd C:\Users\Andy\zig\build-release
"c:\Program Files\CMake\bin\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_PREFIX_PATH=C:\Users\Andy\llvm+clang+lld-20.0.0-x86_64-windows-msvc-release-mt -DCMAKE_BUILD_TYPE=Release
msbuild -p:Configuration=Release INSTALL.vcxproj
```

现在你已在 `bin\zig.exe` 得到 `zig.exe` 二进制文件，可以运行测试：

```bat
bin\zig.exe build test
```

这可能会花费很长时间。

注意：如果你遇到 “llvm-config not found”（或类似）错误，请确认 `-DCMAKE_PREFIX_PATH` 的值末尾**没有**斜杠（`/` 或 `\`）。

## 从源码构建 LLVM、LLD 和 Clang

### Windows

安装 [CMake](https://cmake.org/)，版本 3.20.0 或更新。

[下载 LLVM、Clang 和 LLD 源码](https://releases.llvm.org/download.html#22.0.0)。llvm 的下载会跳转到 github 发布页，其中的源码会被列为：`llvm-22.X.X.src.tar.xz`、`clang-22.X.X.src.tar.xz`、`lld-22.X.X.src.tar.xz`。将每个分别解压到各自的目录。确保没有任何目录包含空格。例如：

 * `C:\Users\Andy\llvm-22.0.0.src`
 * `C:\Users\Andy\clang-22.0.0.src`
 * `C:\Users\Andy\lld-22.0.0.src`

安装 [Visual Studio 2019 生成工具](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2019)。出现提示时务必选择“C++ 生成工具”。
 * 你**必须**额外勾选名为 **C++ ATL for v142 生成工具** 的可选组件，因为默认安装的 Visual Studio 不会提供它。
 * 受支持的 MSVC 版本完整列表：
   - 2017（版本 15.8）（未验证）
   - 2019（版本 16.7）

安装 [Python 3.9.4](https://www.python.org)。勾选将 python 添加到你的 PATH 环境变量的选项。

#### LLVM

通过开始菜单，运行 **x64 Native Tools Command Prompt for VS 2019**，并执行以下命令，将 `C:\Users\Andy` 替换为正确的值。下面列出了我们配置构建时传入的每个 CMake 参数的简要说明：

- `-Thost=x64`：将 windows 工具集设为使用 64 位模式。
- `-A x64`：使构建目标为 64 位。
- `-G "Visual Studio 16 2019"`：指定生成 2019 Visual Studio 工程，这是受支持最好的版本。
- `-DCMAKE_INSTALL_PREFIX=""`：llvm 组件将被安装到的路径（由 install 工程使用）。
- `-DCMAKE_PREFIX_PATH=""`：CMake 在尝试定位依赖项时首先查找的路径，应与安装前缀相同。这能确保 clang 和 lld 使用你新构建的 llvm 库。
- `-DLLVM_ENABLE_ZLIB=OFF`：不要以 ZLib 支持构建 llvm，因为它并非必需，并且会干扰链接 llvm 的组件的依赖关系。该选项只需在构建 llvm 时传入，因为它会被保存到配置头文件中。
- `-DCMAKE_BUILD_TYPE=Release`：以 release 模式构建 llvm 及其组件。
- `-DCMAKE_BUILD_TYPE=Debug`：以 debug 模式构建 llvm 及其组件。
- `-DLLVM_USE_CRT_RELEASE=MT`：release 构建期间 llvm 应使用哪个 C 运行时。
- `-DLLVM_USE_CRT_DEBUG=MTd`：使 llvm 在 debug 构建中使用运行时的 debug 版本。

##### Release 模式

```bat
mkdir C:\Users\Andy\llvm-22.0.0.src\build-release
cd C:\Users\Andy\llvm-22.0.0.src\build-release
"c:\Program Files\CMake\bin\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\Users\Andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_PREFIX_PATH=C:\Users\Andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -
DLLVM_ENABLE_ZLIB=OFF -DCMAKE_BUILD_TYPE=Release -DLLVM_ENABLE_LIBXML2=OFF -DLLVM_USE_CRT_RELEASE=MT
msbuild /m -p:Configuration=Release INSTALL.vcxproj
```

##### Debug 模式

```bat
mkdir C:\Users\Andy\llvm-22.0.0.src\build-debug
cd C:\Users\Andy\llvm-22.0.0.src\build-debug
"c:\Program Files\CMake\bin\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\Users\andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-debug -
DLLVM_ENABLE_ZLIB=OFF -DCMAKE_PREFIX_PATH=C:\Users\andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-debug -DCMAKE_BUILD_TYPE=Debug -DLLVM_EXPERIMENTAL_TARGETS_TO_BUILD="AVR" -DLLVM_ENABLE_LIBXML2=OFF -DLLVM_USE_CRT_DEBUG=MTd
msbuild /m INSTALL.vcxproj
```

#### LLD

通过开始菜单，运行 **x64 Native Tools Command Prompt for VS 2019**，并执行以下命令，将 `C:\Users\Andy` 替换为正确的值。

##### Release 模式

```bat
mkdir C:\Users\Andy\lld-22.0.0.src\build-release
cd C:\Users\Andy\lld-22.0.0.src\build-release
"c:\Program Files\CMake\bin\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\Users\Andy\llvm+clang+lld-14.0.6-x86_64-windows-msvc-release-mt -DCMAKE_PREFIX_PATH=C:\Users\Andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_BUILD_TYPE=Release -DLLVM_USE_CRT_RELEASE=MT
msbuild /m -p:Configuration=Release INSTALL.vcxproj
```

##### Debug 模式

```bat
mkdir C:\Users\Andy\lld-22.0.0.src\build-debug
cd C:\Users\Andy\lld-22.0.0.src\build-debug
"c:\Program Files\CMake\bin\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\Users\andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-debug -DCMAKE_PREFIX_PATH=C:\Users\andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-debug -DCMAKE_BUILD_TYPE=Debug -DLLVM_USE_CRT_DEBUG=MTd
msbuild /m INSTALL.vcxproj
```

#### Clang

通过开始菜单，运行 **x64 Native Tools Command Prompt for VS 2019**，并执行以下命令，将 `C:\Users\Andy` 替换为正确的值。

##### Release 模式

```bat
mkdir C:\Users\Andy\clang-22.0.0.src\build-release
cd C:\Users\Andy\clang-22.0.0.src\build-release
"c:\Program Files\CMake\bin\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\Users\Andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_PREFIX_PATH=C:\Users\Andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-release-mt -DCMAKE_BUILD_TYPE=Release -DLLVM_USE_CRT_RELEASE=MT
msbuild /m -p:Configuration=Release INSTALL.vcxproj
```

##### Debug 模式

```bat
mkdir C:\Users\Andy\clang-22.0.0.src\build-debug
cd C:\Users\Andy\clang-22.0.0.src\build-debug
"c:\Program Files\CMake\bin\cmake.exe" .. -Thost=x64 -G "Visual Studio 16 2019" -A x64 -DCMAKE_INSTALL_PREFIX=C:\Users\andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-debug -DCMAKE_PREFIX_PATH=C:\Users\andy\llvm+clang+lld-22.0.0-x86_64-windows-msvc-debug -DCMAKE_BUILD_TYPE=Debug -DLLVM_USE_CRT_DEBUG=MTd
msbuild /m INSTALL.vcxproj
```

### POSIX 系统

本指南将让你同时获得 LLVM 的 Debug 构建和/或 Release 构建。它特意不要求特权访问，而是使用你主目录下的一个前缀，而非全局安装。

#### Release

这是一般推荐的做法。

```sh
cd ~/Downloads
git clone --depth 1 --branch release/22.x https://github.com/llvm/llvm-project llvm-project-22
cd llvm-project-22
git checkout release/22.x

mkdir build-release
cd build-release
cmake ../llvm \
  -DCMAKE_INSTALL_PREFIX=$HOME/local/llvm22-assert \
  -DCMAKE_BUILD_TYPE=Release \
  -DLLVM_ENABLE_PROJECTS="lld;clang" \
  -DLLVM_ENABLE_LIBXML2=OFF \
  -DLLVM_ENABLE_TERMINFO=OFF \
  -DLLVM_ENABLE_LIBEDIT=OFF \
  -DLLVM_ENABLE_ASSERTIONS=ON \
  -DLLVM_PARALLEL_LINK_JOBS=1 \
  -G Ninja
ninja install
```

#### Debug

在调试 Zig 的 LLVM 后端时偶尔需要它。这里我们把三个项目分开构建，以便 LLVM 处于 Debug 模式，而其余项目处于 Release 模式。

```sh
cd ~/Downloads
git clone --depth 1 --branch release/22.x https://github.com/llvm/llvm-project llvm-project-22
cd llvm-project-22
git checkout release/22.x

# LLVM
mkdir llvm/build-debug
cd llvm/build-debug
cmake .. \
  -DCMAKE_INSTALL_PREFIX=$HOME/local/llvm22-debug \
  -DCMAKE_PREFIX_PATH=$HOME/local/llvm22-debug \
  -DCMAKE_BUILD_TYPE=Debug \
  -DLLVM_ENABLE_LIBXML2=OFF \
  -DLLVM_ENABLE_TERMINFO=OFF \
  -DLLVM_ENABLE_LIBEDIT=OFF \
  -DLLVM_PARALLEL_LINK_JOBS=1 \
  -G Ninja
ninja install
cd ../..

# LLD
mkdir lld/build-debug
cd lld/build-debug
cmake .. \
  -DCMAKE_INSTALL_PREFIX=$HOME/local/llvm22-debug \
  -DCMAKE_PREFIX_PATH=$HOME/local/llvm22-debug \
  -DCMAKE_BUILD_TYPE=Release \
  -DLLVM_PARALLEL_LINK_JOBS=1 \
  -DCMAKE_CXX_STANDARD=17 \
  -G Ninja
ninja install
cd ../..

# Clang
mkdir clang/build-debug
cd clang/build-debug
cmake .. \
  -DCMAKE_INSTALL_PREFIX=$HOME/local/llvm22-debug \
  -DCMAKE_PREFIX_PATH=$HOME/local/llvm22-debug \
  -DCMAKE_BUILD_TYPE=Release \
  -DLLVM_PARALLEL_LINK_JOBS=1 \
  -DLLVM_INCLUDE_TESTS=OFF \
  -G Ninja
ninja install
cd ../..
```

然后，将以下参数加入你从 README.md 中获得的 Zig CMake 命令中：
`-DCMAKE_PREFIX_PATH=$HOME/local/llvm22-debug` 或
`-DCMAKE_PREFIX_PATH=$HOME/local/llvm22-assert`，具体取决于你需要 Debug 还是 Release 版本的 LLVM。


## 贡献

[按月捐助](https://ziglang.org/zsf/)。

[加入社区](https://ziglang.org/community/)。

Zig 是自由开源软件（Free and Open Source Software）。我们欢迎任何人提交 bug 报告与补丁。不过请注意，Zig 的治理模式是 BDFN（Benevolent Dictator For Now，暂定的仁慈独裁者），这意味着 Andrew Kelley 对一切的设计与实现拥有最终决定权。

### 用 Zig 编写软件

你能为 Zig 做出贡献的最佳方式之一，就是开始把它用于一个开源的个人项目。

这能帮助我们发现 bug、充实使用场景，从而推动 Zig 进一步的迭代设计。重要的是，以此方式发现的每个问题都带有真实世界的动机，使人能够清晰地解释提案与功能请求背后的理由。

理想情况下，这样的项目还能同时帮你学到新技能，并为你的个人作品集添砖加瓦。

### 谈论 Zig

另一种贡献方式，是撰写关于 Zig 的文章、在会议上演讲介绍 Zig，或者为你使用 Zig 的项目做上述任何一件事。

编程语言的兴衰取决于其生态系统的活跃度。参与的人越多，我们就越能彼此在对方的抽象之上构建出伟大的事物。

### 严格的禁用 LLM / 禁用 AI 政策

issue 中不得使用 LLM。

补丁 / 拉取请求中不得使用 LLM。

在 bug 跟踪器上的评论中不得使用 LLM，包括翻译。

鼓励使用英语，但非强制。欢迎你使用母语发帖，并依赖他人使用自己偏好的翻译工具来理解你的意思。

### 寻找对贡献者友好的 issue

存在 [Contributor Friendly](https://codeberg.org/ziglang/zig/issues?labels=741726&state=open) 这个 issue 标签，用于帮助你找到**范围有限和/或对 Zig 内部机制了解要求不高**的 issue。

请注意，标记为 [Proposal: Proposed](https://codeberg.org/ziglang/zig/issues?labels=746937&state=open) 的 issue 仍在考虑之中，针对此类提案的实现工作很可能白费力气。如果你对某个仍在考虑中的提案感兴趣，请在 issue 跟踪器中表达你的兴趣，并提供他人尚未表达过的额外见解与考量。这类讨论中最受重视的论据，是真实世界的使用场景。

我们不接受语言提案。请勿提出旨在修改 Zig 语言或语法的 issue。

### 编辑源代码

为了流程顺畅，当从源码构建时，建议使用带有以下设置的 CMake：

 * `-DCMAKE_BUILD_TYPE=Release` —— 加快 zig 的重新编译速度。
 * `-GNinja` —— Ninja 比 Make 更快、更易用。
 * `-DZIG_NO_LIB=ON` —— 阻止构建系统将 lib/ 目录复制到安装前缀，使 zig 直接改用源码树中的 lib/。实际上，这能让对 lib/ 的修改无需重新运行 install 命令即可生效。

配置完成后有两种情景：

 1. 拉取上游变更并重新构建。
    - 这种情况使用 `git pull`，然后 `ninja install`。预计耗时：约 10 分钟。
 2. 在做出本地修改后从源码构建。
    - 这种情况使用 `stage3/bin/zig build -p stage4 -Denable-llvm -Dno-lib`。预计耗时：约 20 秒。

这样你会得到两份 Zig 构建：

 * `stage3/bin/zig` —— 经过优化的 master 分支构建。适用于 `zig fmt` 等杂项活动，以及在修改源码后构建编译器本身。
 * `stage4/bin/zig` —— 一份包含你本地修改的 debug 构建；适用于在提交补丁前进行调试与排错。

为减少等待编译器构建的时间，可尝试以下技巧：

 * 如果你不需要 LLVM 后端，省略 `-Denable-llvm`。
 * 使用 `-Ddev=foo` 以缩减后的特性集构建，用于开发特定功能。可运行 `zig build -h` 查看选项列表。
 * 使用 `--watch -fincremental` 启用增量编译。这能带来**近乎即时的重新构建**。

### 测试

```sh
stage4/bin/zig build test
```

该命令会运行整个测试套件，它做了大量你可能并不总是需要的额外测试，耗时可能超过 1 小时。这正是你提交拉取请求时 CI 服务器所运行的内容。

为节省时间，你可以给 `zig build` 命令加上 `--help` 选项，查看有哪些可用选项。其中最有用的之一是 `-Dskip-release`。把该选项与上方的命令结合，再加上 `-Dskip-non-native`，可将时间从约 2 小时缩减到约 30 分钟，这对于提交拉取请求前来说已是足够的测试量。

另一个例子是选择不同的待测试集合。例如，用 `test-std` 代替 `test`，将只运行标准库测试，而不运行其他测试。将这条建议与上一条结合，你可以这样做：

```sh
stage4/bin/zig build test-std -Dskip-release
```

这只会以 debug 模式为所有目标运行标准库测试。它会为原生之外的目标交叉编译测试，但不会运行它们。

在修改编译器源代码时，最有帮助的测试步骤是运行 `test-behavior`。在编辑文档时则是 `docs`。你可以在 `zig build --help` 菜单中找到这些信息以及更多内容。

#### 使用 `zig test` 直接测试标准库

该命令将只以原生目标配置运行标准库测试，预计 3 分钟完成：

```sh
zig build test-std -Dno-matrix
```

不过，也可以直接对标准库根文件 [`lib/std/std.zig`](https://codeberg.org/ziglang/zig/src/branch/master/lib/std/std.zig) 使用 `zig test`。在 `ziglang/zig` 仓库根目录内：

```sh
zig test lib/std/std.zig --zig-lib-dir lib
```

你可以加上 `--test-filter "某个测试名"` 来运行某个特定测试或测试子集。（精确运行恰好 1 个测试并不可靠，因为测试过滤器不会排除匿名测试块，但这在实践中不应影响你试图测试的内容。）

注意 `--test-filter` 是按全限定名过滤的，因此例如可以仅运行 `std.json` 的测试：

```sh
zig test lib/std/std.zig --zig-lib-dir lib --test-filter "json."
```

如果你使用了 `-Dno-lib` 且当前处于 `build/` 子目录中，可以省略 `--zig-lib-dir` 参数：

```sh
stage3/bin/zig test ../lib/std/std.zig
```

#### 使用 QEMU 测试非原生架构

Linux CI 服务器额外安装了 qemu 并设置了 `-fqemu`。这为例如 aarch64 等架构提供了测试覆盖，即使在 x86_64 机器上也是如此。建议 Linux 用户在编辑标准库或与任何非原生架构相关的内容时，安装 qemu 并启用该测试选项。

某些系统包管理器（如 Debian）提供的 QEMU 包可能落后几个版本，或可能缺少较新的目标（如 aarch64 和 RISC-V）。[ziglang/qemu-static](https://codeberg.org/ziglang/qemu-static) 提供了最新版 QEMU 的静态二进制文件。

##### 测试非原生的 libc 目标

测试使用动态链接 libc 的外来架构要更麻烦一步。这需要启用 `--libc-runtimes /path/to/libcs`。该路径通过为多种架构构建 glibc 和 musl 获得。对我来说，这一过程花费了整整一天，并在硬盘上占用了 65 GiB。

[生成该路径的说明。](https://codeberg.org/ziglang/infra/src/branch/master/building-libcs.md)

据我们所知，大多数贡献者不会启用这些测试。CI 机器会为这些测试提供覆盖。

#### 使用 Wine 从 Linux 机器测试 Windows

在 Linux 上开发时，你还有一个选项：`-fwine`。这将启用使用 Wine 运行行为测试和标准库测试。建议 Linux 用户在编辑标准库或与 Windows 相关的任何内容时，安装 Wine 并启用该测试选项。

#### 使用 wasmtime 测试 WebAssembly

如果你安装了 [wasmtime](https://wasmtime.dev/)，可利用 `-fwasmtime` 标志来启用运行 WASI 行为测试和标准库测试。建议所有用户在编辑标准库，尤其是任何与 WebAssembly 相关的内容时，安装 wasmtime 并启用该测试选项。

### 改进 Translate-C

`translate-c` 是 Zig 提供的一项功能，可将 C 源代码转换为 Zig 源代码。它驱动 `zig translate-c` 命令，使 Zig 代码不仅能利用 C 头文件中定义的函数原型，还能利用 C 中编写的 `static inline` 函数，甚至部分宏。

该功能过去是通过使用 libclang API 解析并语义分析 C/C++ 文件，然后基于提供的 AST 和类型信息生成 Zig AST，最终使用 `zig fmt` 的机制将 Zig AST 渲染到文件中来实现的。

不过，它现在基于 [arocc](https://github.com/Vexu/arocc/)，一个用 Zig 编写的第三方 C 编译器。测试覆盖、bug 报告以及官方实现都在此仓库中：[ziglang/translate-c](https://codeberg.org/ziglang/translate-c/)

该包目前被 vendored（内置）到 Zig 源码树中。TranslateC 构建步骤利用这一点，提供在个人 build.zig 脚本中配置 C 翻译的能力。

贡献方式请参阅 translate-c 项目的 readme。一旦其中的某个 issue 被解决（并补充了测试覆盖），这些改动可立即反向移植到 zig 编译器。

不过未来，该构建步骤将被移除，转而通过构建系统 / 包管理器显式依赖 translate-c 包。到那时，Zig 将停止 vendoring arocc。

### Autodoc

Autodoc 是一个用于浏览 Zig 代码库的交互式、可搜索单页 Web 应用。

一个 autodoc 部署看起来像这样：

```
index.html
main.js
main.wasm
sources.tar
```

* `main.js` 和 `index.html` 是静态文件，位于 Zig 安装的 [`lib/docs/`](https://codeberg.org/ziglang/zig/src/branch/master/lib/docs/) 中。
* `main.wasm` 由 [`lib/docs/wasm/`](https://codeberg.org/ziglang/zig/src/branch/master/lib/docs/wasm/) 中的 Zig 文件编译而来。
* `sources.tar` 是项目的所有 zig 源文件。

这些产物在传入 `-femit-docs` 时由编译器生成。

#### 进行修改

命令 `zig std` 会启动一个 HTTP 服务器，专门提供上述标准库相关的所有资源。

该服务器会即时创建所请求的文件，包括在任意源文件发生变更时重新构建 `main.wasm`、以及构造 `sources.tar`，这意味着对被文档化文件的任何源码修改，或对 autodoc 系统本身的修改，都会在查看文档时立即反映出来。

这意味着你可以通过在浏览器中按下刷新，来测试对 Zig 标准库文档以及 autodocs 功能的修改。

在 URL 前加上 `/debug` 会生成 `main.wasm` 的 debug 构建。

#### 调试 Zig 代码

虽然对 Firefox 和 Safari 的支持显然是必需的，但我特别推荐 Chromium 用于开发，原因只有一个：

[C/C++ DevTools Support (DWARF)](https://chromewebstore.google.com/detail/cc++-devtools-support-dwa/pdcpmagijalfljmkmjngeonclgbbannb)

这让调试 Zig 的 WebAssembly 代码变得轻而易举。

#### 源文件 Tar 包

系统期望 `sources.tar` 的顶层是所文档化的模块集合。因此对于 Zig 标准库，你会这样做：`tar cf std.tar std/`。不要压缩它；其理念是依赖 HTTP 压缩。

任何不是 `.zig` 源文件的文件都会被 `main.wasm` 忽略，但这些文件仍会占用 tar 包中无谓的空间。对于标准库，请使用运行 `zig build` 时 zig 安装到的那组文件，它与 ziglang.org/download 上提供的文件集合相同。

如果系统找不到名为 “foo/root.zig” 或 “foo/foo.zig” 的文件，它会把 tar 包中的第一个文件用作模块根。

你通常不需要自己创建 `sources.tar`，因为它由 `zig std` HTTP 服务器惰性提供，同时也由 `-femit-docs` 生成。


## 使用 LLDB 测试 Zig 代码

[@jacobly0](https://github.com/jacobly0) 维护着一个带有 Zig 支持的 LLDB 分支：

https://github.com/jacobly0/llvm-project/tree/lldb-zig

该分支仅包含针对由 Zig 自托管后端（即 `zig build-exe -fno-llvm ...`）编译出的程序的调试改动。

### 构建

要构建该 LLDB 分支，请确保已安装[先决条件](https://lldb.llvm.org/resources/build.html#preliminaries)，然后执行类似如下命令：

```sh
$ cmake llvm -G Ninja -B build -DLLVM_ENABLE_PROJECTS="clang;lldb" -DCMAKE_BUILD_TYPE=Release -DLLVM_ENABLE_ASSERTIONS=ON -DLLDB_ENABLE_LIBEDIT=ON -DLLDB_ENABLE_PYTHON=ON
$ cmake --build build --target lldb --target lldb-server
```

（如果 CMake 找不到依赖，你可能需要手动[配置依赖](https://lldb.llvm.org/resources/build.html#optional-dependencies)。）

构建完成后，你可以运行 `./build/bin/lldb` 等等。

### Pretty Printers

如果你要调试 Zig 编译器本身，或者要调试任何使用 Zig 的 LLVM 后端编译的项目（不建议配合该 LLDB 分支使用，更推荐版本与 Zig 所用 LLVM 版本匹配的官方 LLDB），可以通过使用 [`lldb_pretty_printers.py`](https://codeberg.org/ziglang/zig/src/branch/master/tools/lldb_pretty_printers.py) 获得更好的调试体验。

在 `~/.lldbinit` 中加入这一行：

```
command script import /path/to/zig/tools/lldb_pretty_printers.py
```

如果你要使用 Zig 的 LLVM 后端（再次提醒，不建议配合该 LLDB 分支使用），还需要以下这些行：

```
type category enable zig.lang
type category enable zig.std
```

如果你要调试一个使用 Zig 的 LLVM 后端构建出的 Zig 编译器（同样不建议配合该 LLDB 分支使用），还需要这一行：

```
type category enable zig.stage2
```
