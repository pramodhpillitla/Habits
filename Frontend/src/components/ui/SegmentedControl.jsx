export function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div className="segmented-control" aria-label={label}>
      {options.map((option) => (
        <button key={option} type="button" className={value === option ? "active" : ""} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
