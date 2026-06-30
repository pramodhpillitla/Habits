export function PieChart({ stats }) {
  const percent = stats?.completionPercentage || 0;

  return (
    <div className="flex flex-col items-center gap-6 py-6 w-full max-w-[280px] mx-auto">
      <div 
        className="w-[140px] h-[140px] md:w-[220px] md:h-[220px] rounded-full flex items-center justify-center relative shadow-lg shadow-blue-500/20 shrink-0"
        style={{ background: `conic-gradient(#2563eb ${percent}%, #eff6ff 0)` }}
      >
        <div className="absolute inset-4 md:inset-5 bg-white rounded-full shadow-inner flex items-center justify-center">
          <span className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter">{percent}%</span>
        </div>
      </div>
      
      <div className="flex w-full justify-between gap-3 md:gap-4 px-2 mt-2">
        <div className="flex items-center gap-1 md:gap-2 bg-blue-50 px-2 py-1.5 md:px-4 md:py-2 rounded-xl flex-1 justify-center">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-600/50" />
          <span className="font-bold text-blue-700 text-[10px] md:text-sm">Completed {stats?.completed || 0}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2 bg-red-50 px-2 py-1.5 md:px-4 md:py-2 rounded-xl flex-1 justify-center">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
          <span className="font-bold text-red-600 text-[10px] md:text-sm">Missed {stats?.missed || 0}</span>
        </div>
      </div>
    </div>
  );
}
