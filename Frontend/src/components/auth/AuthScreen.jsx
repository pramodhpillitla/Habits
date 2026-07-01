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
      onAuth(data.user);
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
    <main className="min-h-screen grid place-items-center bg-[#f4f6fa] p-4 md:p-8">
      <section className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-14 h-14 grid place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white font-black text-2xl shadow-lg shadow-blue-500/30">
              H
            </span>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Habit Due</h1>
              <p className="text-slate-500 font-medium">Only see habits that need attention today.</p>
            </div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={submit}>
            <SegmentedControl label="Authentication mode" options={["login", "register"]} value={mode} onChange={setMode} />

            {mode === "register" && (
              <label className="flex flex-col gap-2 text-slate-700 font-bold text-sm mt-2">
                Name
                <input 
                  required 
                  value={form.name} 
                  onChange={updateField("name")} 
                  placeholder="Your name" 
                  className="w-full min-h-[48px] px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-normal"
                />
              </label>
            )}

            <label className="flex flex-col gap-2 text-slate-700 font-bold text-sm mt-2">
              Email
              <input 
                required 
                type="email" 
                value={form.email} 
                onChange={updateField("email")} 
                placeholder="you@example.com" 
                className="w-full min-h-[48px] px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-normal"
              />
            </label>

            <label className="flex flex-col gap-2 text-slate-700 font-bold text-sm">
              Password
              <input
                required
                minLength={6}
                type="password"
                value={form.password}
                onChange={updateField("password")}
                placeholder="Minimum 6 characters"
                className="w-full min-h-[48px] px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-normal"
              />
            </label>

            {error && <p className="bg-red-50 text-red-600 p-3 rounded-xl font-bold text-sm mt-2">{error}</p>}

            <button 
              className="mt-4 min-h-[52px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] disabled:opacity-70" 
              disabled={loading}
            >
              {loading ? "Working..." : mode === "register" ? "Create Account" : "Login"}
            </button>
          </form>
        </div>

        <div className="hidden md:block">
          <AuthPreview />
        </div>
      </section>
    </main>
  );
}
