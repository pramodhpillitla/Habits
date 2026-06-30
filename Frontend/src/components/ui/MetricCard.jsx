const colorStyles = {
  blue: "text-blue-600",
  green: "text-emerald-500",
  orange: "text-orange-500",
  purple: "text-purple-500",
};

export function MetricCard({ label, value, color = "blue" }) {
  return (
    <article className="p-4 md:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between h-[100px] md:h-[120px] transition-transform active:scale-95">
      <span className="text-slate-500 font-medium text-[11px] md:text-[13px] uppercase tracking-wide">{label}</span>
      <strong className={`text-3xl md:text-[40px] font-extrabold leading-none ${colorStyles[color]}`}>{value}</strong>
    </article>
  );
}
