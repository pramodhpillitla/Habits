export function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full" aria-label={label}>
      {options.map((option) => (
        <button 
          key={option} 
          type="button" 
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm capitalize transition-all duration-200 ${
            value === option 
              ? "bg-white text-blue-600 shadow-sm shadow-slate-200" 
              : "text-slate-500 hover:text-slate-700"
          }`} 
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
