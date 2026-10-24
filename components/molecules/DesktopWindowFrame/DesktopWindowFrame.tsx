import type { ReactNode } from "react";

type DesktopWindowFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function DesktopWindowFrame({ title, children, className = "" }: DesktopWindowFrameProps) {
  return (
    <div
      className={`water-drop-glass-deep overflow-hidden rounded-4xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/80 bg-white/50 px-6 py-4">
        <span className="size-2.5 rounded-full bg-on-surface/20" aria-hidden />
        <span className="size-2.5 rounded-full bg-on-surface/20" aria-hidden />
        <span className="size-2.5 rounded-full bg-on-surface/20" aria-hidden />
        <span className="ml-3 flex-1 truncate text-center font-mono text-xs font-semibold text-on-surface-variant">
          {title}
        </span>
      </div>
      <div className="min-h-70 p-8 lg:min-h-80 lg:p-10">{children}</div>
    </div>
  );
}
