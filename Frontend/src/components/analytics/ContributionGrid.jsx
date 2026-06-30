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
      case 4: return "bg-blue-600";
      case 3: return "bg-blue-500";
      case 2: return "bg-blue-400";
      case 1: return "bg-blue-200";
      default: return "bg-slate-100";
    }
  };

  if (!days || days.length === 0) return null;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsData = [];

  let currentMonthKey = "";
  let currentMonthGroup = null;

  // Group days into strictly distinct month blocks
  days.forEach(day => {
    const parts = day.date.split("-");
    const year = parts[0];
    const month = parts[1];
    const dateNum = parts[2];
    const key = `${year}-${month}`;

    if (key !== currentMonthKey) {
      if (currentMonthGroup) {
        monthsData.push(currentMonthGroup);
      }
      
      // Calculate the weekday offset for the very first day of this specific block
      const firstDate = new Date(year, parseInt(month) - 1, dateNum);
      const offset = firstDate.getDay();
      
      currentMonthGroup = {
        key,
        monthName: monthNames[parseInt(month) - 1],
        cells: Array.from({ length: offset }).map((_, i) => ({ isBlank: true, id: `${key}-start-${i}` }))
      };
      currentMonthKey = key;
    }
    
    currentMonthGroup.cells.push({ ...day, isBlank: false });
  });

  if (currentMonthGroup) {
    monthsData.push(currentMonthGroup);
  }

  // Pad the end of each month block to complete the 7-day columns and chunk into weeks
  monthsData.forEach(month => {
    const remainder = month.cells.length % 7;
    if (remainder !== 0) {
      const padCount = 7 - remainder;
      for (let i = 0; i < padCount; i++) {
        month.cells.push({ isBlank: true, id: `${month.key}-end-${i}` });
      }
    }
    
    const weeks = [];
    for (let i = 0; i < month.cells.length; i += 7) {
      weeks.push(month.cells.slice(i, i + 7));
    }
    month.weeks = weeks;
  });

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
        <div className="flex pt-1 min-w-max gap-3 md:gap-4" aria-label="Consistency chart">
          {monthsData.map((month) => (
            <div key={month.key} className="flex flex-col">
              <div className="flex gap-1">
                {month.weeks.map((week, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {week.map((cell, j) => {
                      if (cell.isBlank) return <div key={cell.id || j} className="w-3 h-3 md:w-3.5 md:h-3.5" />;
                      return (
                        <span
                          key={cell.date}
                          className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] transition-colors ${getLevelClass(cell.level)} hover:ring-2 hover:ring-blue-400 cursor-pointer`}
                          title={`${cell.date}: ${cell.completed}/${cell.dueCount} completed`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="h-4 mt-2 flex items-start justify-start overflow-visible">
                <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap -ml-1">
                  {month.monthName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
