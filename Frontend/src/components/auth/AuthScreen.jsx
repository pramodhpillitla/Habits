import { useState } from "react";
import { apiRequest } from "../../utils/api";
import { AuthPreview } from "./AuthPreview";
import { SegmentedControl } from "../ui/SegmentedControl";

export function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = mode === "register" ? form : { email: form.email, password: form.password };
      const data = await apiRequest(`/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      localStorage.setItem("habit_token", data.token);
      onAuth(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-copy">
          <div className="brand-lockup">
            <span className="brand-mark">H</span>
            <div>
              <h1>Habit Due</h1>
              <p>Only see the habits that need your attention today.</p>
            </div>
          </div>

          <form className="auth-form" onSubmit={submit}>
            <SegmentedControl label="Authentication mode" options={["login", "register"]} value={mode} onChange={setMode} />

            {mode === "register" && (
              <label>
                Name
                <input required value={form.name} onChange={updateField("name")} placeholder="Your name" />
              </label>
            )}

            <label>
              Email
              <input required type="email" value={form.email} onChange={updateField("email")} placeholder="you@example.com" />
            </label>

            <label>
              Password
              <input
                required
                minLength={6}
                type="password"
                value={form.password}
                onChange={updateField("password")}
                placeholder="Minimum 6 characters"
              />
            </label>

            {error && <p className="form-error">{error}</p>}

            <button className="primary-action" disabled={loading}>
              {loading ? "Working..." : mode === "register" ? "Create Account" : "Login"}
            </button>
          </form>
        </div>

        <AuthPreview />
      </section>
    </main>
  );
}
