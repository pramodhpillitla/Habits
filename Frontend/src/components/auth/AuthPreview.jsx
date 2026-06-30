export function AuthPreview() {
  return (
    <div className="auth-preview" aria-hidden="true">
      <div className="phone-frame">
        <div className="phone-hero">
          <span>todo</span>
          <small>Jun</small>
          <div className="date-strip">
            <b>19</b>
            <span>20</span>
            <span>21</span>
            <span>22</span>
          </div>
        </div>
        <div className="preview-card blue">
          Drink Water<span>Every day</span>
        </div>
        <div className="preview-card pink">
          Water Plants<span>Every 3 days</span>
        </div>
        <div className="preview-card violet">
          Bedsheet<span>Every 7 days</span>
        </div>
      </div>
    </div>
  );
}
