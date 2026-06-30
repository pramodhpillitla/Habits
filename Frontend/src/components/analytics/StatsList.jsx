export function StatsList({ stats }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-8">
      <div className="col-span-2 md:col-span-1 bg-slate-50 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center border border-slate-100">
        <dt className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-tight md:tracking-wider mb-1 text-center">Total Due</dt>
        <dd className="text-xl md:text-2xl font-black text-slate-800">{stats?.totalDue || 0}</dd>
      </div>
      <div className="bg-blue-50 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center border border-blue-100/50">
        <dt className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-tight md:tracking-wider mb-1 text-center">Completed</dt>
        <dd className="text-xl md:text-2xl font-black text-blue-700">{stats?.completed || 0}</dd>
      </div>
      <div className="bg-red-50 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center border border-red-100/50">
        <dt className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-tight md:tracking-wider mb-1 text-center">Missed</dt>
        <dd className="text-xl md:text-2xl font-black text-red-600">{stats?.missed || 0}</dd>
      </div>
    </dl>
  );
}
