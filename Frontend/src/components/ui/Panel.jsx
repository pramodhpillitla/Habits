export function Panel({ eyebrow, title, action, children }) {
  return (
    <section className="panel">
      {(eyebrow || title || action) && (
        <div className="panel-heading">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
