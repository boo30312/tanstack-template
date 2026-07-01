// Brand marks for Syria TV and Syria Economic.
// Simple, self-contained wordmarks aligned with the platform's enterprise identity.

export function SyriaTvLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} dir="ltr">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-teal)] text-white shadow-sm">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="13"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M10 9.5L14.5 11.5L10 13.5V9.5Z"
            fill="currentColor"
          />
          <path
            d="M9 21H15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-extrabold tracking-wide text-white">
          SYRIA TV
        </span>
        <span className="text-[11px] font-medium text-slate-300" dir="rtl">
          تلفزيون سوريا
        </span>
      </span>
    </div>
  )
}

export function SyriaEconomicLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-gold)]/15 text-[var(--brand-gold)]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 15L9 10L13 14L20 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 7H20V11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-bold text-slate-100">
          سوريا الاقتصادية
        </span>
        <span className="text-[10px] font-medium text-slate-400" dir="ltr">
          Syria Economic
        </span>
      </span>
    </div>
  )
}
