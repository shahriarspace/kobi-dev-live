import { useState, useEffect } from "react";

const CODE_LINES = [
  { text: "function fibonacci(n) {", delay: 0, isUser: true },
  { text: '  if (n <= 1) return n;', delay: 800, isUser: false },
  { text: '  return fibonacci(n - 1) + fibonacci(n - 2);', delay: 1600, isUser: false },
  { text: "}", delay: 2400, isUser: false },
];

export default function CodeAnimation() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Show the first line (user-typed) immediately
    setVisibleLines(1);

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Then type out AI suggestions one by one
    CODE_LINES.forEach((line, index) => {
      if (index === 0) return; // Skip first line (already shown)
      timers.push(
        setTimeout(() => {
          setVisibleLines(index + 1);
        }, line.delay)
      );
    });

    // Loop the animation
    timers.push(
      setTimeout(() => {
        setVisibleLines(0);
        setTimeout(() => {
          setVisibleLines(1);
          // Re-trigger the animation
          CODE_LINES.forEach((line, index) => {
            if (index === 0) return;
            timers.push(
              setTimeout(() => {
                setVisibleLines(index + 1);
              }, line.delay)
            );
          });
        }, 500);
      }, 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-kobi-border bg-kobi-surface shadow-2xl shadow-emerald-500/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-kobi-border px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-kobi-muted" data-i18n="code.filename">main.js — Kobi AI</span>
      </div>

      {/* Code area */}
      <div className="p-4 font-mono text-sm leading-relaxed">
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-4 select-none text-kobi-muted/50 w-4 text-right">
              {i + 1}
            </span>
            <span className={line.isUser ? "text-white" : "text-emerald-400/80"}>
              {line.text}
            </span>
            {i === visibleLines - 1 && !line.isUser && (
              <span className="ml-1 text-emerald-400 cursor-blink">|</span>
            )}
          </div>
        ))}
        {visibleLines > 0 && visibleLines < CODE_LINES.length && (
          <div className="mt-1 flex items-center gap-1 text-xs text-kobi-muted">
            <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span data-i18n="code.suggesting">Kobi is suggesting...</span>
          </div>
        )}
      </div>
    </div>
  );
}
