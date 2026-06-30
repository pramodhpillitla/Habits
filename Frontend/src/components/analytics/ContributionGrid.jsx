export function ContributionGrid({ days }) {
  const getLevelClass = (level) => {
    switch (level) {
      case 4: return "bg-blue-600";
      case 3: return "bg-blue-500";
      case 2: return "bg-blue-300";
      case 1: return "bg-blue-200";
      default: return "bg-slate-100";
    }
  };

  if (!days || days.length === 0) return null;

  // Safely parse the first date to find the day of week offset
  // Format is "YYYY-MM-DD"
  const dateParts = days[0].date.split("-");
  const firstDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  const offset = firstDate.getDay(); // 0 = Sunday, 1 = Monday
  
  const blanks = Array.from({ length: offset }).map((_, i) => ({ isBlank: true, id: `blank-${i}` }));
  const gridCells = [...blanks, ...days.map(d => ({ ...d, isBlank: false }))];

  return (
    <div className="flex gap-2 mt-4 items-start w-full">
      {/* Weekday labels */}
      <div className="grid grid-rows-7 gap-1 text-[9px] md:text-[10px] font-medium text-slate-400 leading-none min-w-max shrink-0 pt-1">
        <div className="h-3 md:h-4 flex items-center justify-end pr-1"></div>
        <div className="h-3 md:h-4 flex items-center justify-end pr-1">Mon</div>
        <div className="h-3 md:h-4 flex items-center justify-end pr-1"></div>
        <div className="h-3 md:h-4 flex items-center justify-end pr-1">Wed</div>
        <div className="h-3 md:h-4 flex items-center justify-end pr-1"></div>
        <div className="h-3 md:h-4 flex items-center justify-end pr-1">Fri</div>
        <div className="h-3 md:h-4 flex items-center justify-end pr-1"></div>
      </div>
      
      {/* Grid container */}
      <div className="flex-1 overflow-x-auto no-scrollbar pb-2">
        <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-max pt-1" aria-label="Consistency chart">
          {gridCells.map((cell) => {
            if (cell.isBlank) {
              return <div key={cell.id} className="w-3 h-3 md:w-4 md:h-4" />;
            }
            return (
              <span
                key={cell.date}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-[3px] md:rounded-[4px] transition-colors ${getLevelClass(cell.level)} hover:ring-2 hover:ring-blue-400 cursor-pointer`}
                title={`${cell.date}: ${cell.completed}/${cell.dueCount} completed`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
