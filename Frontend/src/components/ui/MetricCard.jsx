const colorStyles = {
  blue: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/30",
  green: "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-emerald-500/30",
  orange: "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-orange-500/30",
  purple: "bg-gradient-to-br from-purple-400 to-purple-500 text-white shadow-purple-500/30",
};

export function MetricCard({ label, value, color = "blue" }) {
  return (
    <article className={`p-5 rounded-[24px] shadow-lg flex flex-col justify-between h-[120px] ${colorStyles[color]} transition-transform active:scale-95`}>
      <span className="text-white/90 font-medium text-[13px]">{label}</span>
      <strong className="text-[40px] font-bold leading-none">{value}</strong>
    </article>
  );
}
