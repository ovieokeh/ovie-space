import { ReactNode } from "react";

interface TVFrameProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

export function TVFrame({ children, className = "", label }: TVFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Antenna — V opening upward, apex joining the cabinet top */}
      <svg
        viewBox="0 0 60 22"
        className="absolute -top-4 left-1/2 h-5 w-14 -translate-x-1/2"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 2 L30 20 L52 2"
          stroke="var(--cinefill-amber)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="20" r="2.5" fill="var(--cinefill-amber)" />
      </svg>

      {/* Cabinet — main screen area + amber side panel as one flex unit */}
      <div className="flex overflow-hidden rounded-[28px] border-2 border-cinefill-ink/90 bg-cinefill-ink shadow-[0_24px_60px_-30px_rgba(26,26,26,0.6)] dark:border-cinefill-ink/40 dark:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
        {/* Screen area */}
        <div className="relative flex-1 bg-cinefill-ink p-5 pt-7 sm:p-7">
          {label ? (
            <span className="absolute left-5 top-3 z-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-cinefill-amber/80">
              {label}
            </span>
          ) : null}
          <div className="relative z-10">{children}</div>

          {/* Soft glow inside the screen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[20px]"
            style={{
              background:
                "radial-gradient(ellipse at 30% 0%, rgba(232,181,71,0.10), transparent 60%)",
            }}
          />
        </div>

        {/* Amber side panel with two control dots */}
        <div className="flex w-7 flex-col items-center justify-center gap-3 bg-cinefill-amber sm:w-10">
          <span className="h-2.5 w-2.5 rounded-full bg-cinefill-ink/85 sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-cinefill-ink/85 sm:h-3 sm:w-3" />
        </div>
      </div>
    </div>
  );
}
