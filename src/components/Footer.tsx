export default function Footer() {
  return (
    <footer className="border-t border-zig-border bg-zig-bg-elevated/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-zig-orange">Z</span>
              <span className="font-display text-lg font-semibold text-zig-text-bright">
                Zig<span className="text-zig-orange">中文</span>
              </span>
            </div>
            <p className="mt-4 max-w-[50ch] text-sm leading-relaxed text-zig-text-muted">
              一种用于编写健壮、最优且可复用软件的通用编程语言及工具链。
              本站为中文社区翻译与整理，旨在帮助中文开发者了解和使用 Zig。
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-zig-text-bright">资源</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://ziglang.org/download/" target="_blank" rel="noopener noreferrer" className="text-sm text-zig-text-muted transition-colors hover:text-zig-orange">
                  下载 Zig
                </a>
              </li>
              <li>
                <a href="https://ziglang.org/documentation/" target="_blank" rel="noopener noreferrer" className="text-sm text-zig-text-muted transition-colors hover:text-zig-orange">
                  语言参考
                </a>
              </li>
              <li>
                <a href="https://ziglang.org/learn/" target="_blank" rel="noopener noreferrer" className="text-sm text-zig-text-muted transition-colors hover:text-zig-orange">
                  学习资源
                </a>
              </li>
              <li>
                <a href="https://codeberg.org/ziglang/zig" target="_blank" rel="noopener noreferrer" className="text-sm text-zig-text-muted transition-colors hover:text-zig-orange">
                  源码仓库
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-zig-text-bright">社区</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://ziglang.org/community/" target="_blank" rel="noopener noreferrer" className="text-sm text-zig-text-muted transition-colors hover:text-zig-orange">
                  加入社区
                </a>
              </li>
              <li>
                <a href="https://ziglang.org/zsf/" target="_blank" rel="noopener noreferrer" className="text-sm text-zig-text-muted transition-colors hover:text-zig-orange">
                  按月捐助
                </a>
              </li>
              <li>
                <a href="https://codeberg.org/ziglang/zig/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-zig-text-muted transition-colors hover:text-zig-orange">
                  Issue 跟踪
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zig-border pt-8 text-center">
          <p className="text-sm text-zig-text-muted">
            Zig 是自由开源软件（FOSS） · 治理模式为 BDFN（暂定的仁慈独裁者）
          </p>
          <p className="mt-2 text-xs text-zig-text-muted/60">
            © 2025 Zig 中文社区 · 本站内容基于 Zig 官方文档翻译整理
          </p>
        </div>
      </div>
    </footer>
  )
}
