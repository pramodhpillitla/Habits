import { useEffect, useRef } from 'react';

export function ContributionGrid({ days }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [days]);

  const getLevelClass = (level) => {
    switch (level) {
      case 4: return "bg-[#216e39]";
      case 3: return "bg-[#30a14e]";
      case 2: return "bg-[#40c463]";
      case 1: return "bg-[#9be9a8]";
      default: return "bg-slate-100";
    }
  };

  if (!days || days.length === 0) return null;

  const dateParts = days[0].date.split("-");
  const firstDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  const offset = firstDate.getDay(); 
  
  const blanks = Array.from({ length: offset }).map((_, i) => ({ isBlank: true, id: `blank-${i}` }));
  const allCells = [...blanks, ...days.map(d => ({ ...d, isBlank: false }))];

  const weeks = [];
  let currentWeek = [];
  allCells.forEach(cell => {
    currentWeek.push(cell);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ isBlank: true, id: `end-blank-${currentWeek.length}` });
    }
    weeks.push(currentWeek);
  }

  const getWeekMonth = (week) => {
    const validDays = week.filter(d => !d.isBlank);
    if (validDays.length === 0) return -1;
    return new Date(validDays[validDays.length - 1].date).getMonth();
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="flex gap-2 mt-4 items-start w-full">
      {/* Weekday labels */}
      <div className="flex flex-col gap-1 text-[9px] md:text-[10px] font-medium text-slate-400 leading-none min-w-max shrink-0 pt-1">
        <div className="h-3 md:h-3.5 flex items-center justify-end pr-1"></div>
        <div className="h-3 md:h-3.5 flex items-center justify-end pr-1">Mon</div>
        <div className="h-3 md:h-3.5 flex items-center justify-end pr-1"></div>
        <div className="h-3 md:h-3.5 flex items-center justify-end pr-1">Wed</div>
        <div className="h-3 md:h-3.5 flex items-center justify-end pr-1"></div>
        <div className="h-3 md:h-3.5 flex items-center justify-end pr-1">Fri</div>
        <div className="h-3 md:h-3.5 flex items-center justify-end pr-1"></div>
      </div>
      
      {/* Grid container */}
      <div className="flex-1 overflow-x-auto no-scrollbar pb-2" ref={scrollRef}>
        <div className="flex pt-1 min-w-max" aria-label="Consistency chart">
          {weeks.map((week, i) => {
            const currentMonth = getWeekMonth(week);
            const prevMonth = i > 0 ? getWeekMonth(weeks[i - 1]) : -1;
            const nextMonth = i < weeks.length - 1 ? getWeekMonth(weeks[i + 1]) : -1;

            const isFirstWeek = currentMonth !== prevMonth;
            const isLastWeek = currentMonth !== nextMonth;

            return (
              <div key={i} className={`flex flex-col ${isLastWeek ? 'mr-3 md:mr-4' : 'mr-1'}`}>
                <div className="flex flex-col gap-1">
                  {week.map((cell, j) => {
                    if (cell.isBlank) return <div key={cell.id || j} className="w-3 h-3 md:w-3.5 md:h-3.5" />;
                    return (
                      <span
                        key={cell.date}
                        className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] transition-colors ${getLevelClass(cell.level)} hover:ring-2 hover:ring-[#40c463] cursor-pointer`}
                        title={`${cell.date}: ${cell.completed}/${cell.dueCount} completed`}
                      />
                    );
                  })}
                </div>
                <div className="h-4 mt-2 flex items-start justify-start overflow-visible">
                  {isFirstWeek && currentMonth !== -1 && (
                    <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap -ml-1">
                      {monthNames[currentMonth]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
