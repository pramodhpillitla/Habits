export function Panel({ eyebrow, title, action, children }) {
  return (
    <section className="bg-white rounded-[32px] p-5 md:p-8 shadow-sm shadow-slate-200/50 border border-slate-100">
      {(eyebrow || title || action) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {eyebrow && <p className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-1">{eyebrow}</p>}
            {title && <h2 className="text-slate-800 text-xl font-bold">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
