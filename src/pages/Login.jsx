import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/api/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ---------- validation ---------- */
  const validate = () => {
    const newErrors = {};
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      login(data);
      navigate("/poems");
    } catch {
      setErrors({ general: "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-100"
        style={{
          backgroundImage: "url('/assets/images/main-background.jpg')",
        }}
      />

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2.5px]" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}

      {/* Card */}
      <Card
        className="
        relative z-10 
        w-full max-w-md
        rounded-3xl 
        bg-white/80 
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
        border border-white/30
        animate-fadeIn
      "
      >
        <CardContent className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Return to your quiet creative space.
            </p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="Email address"
                className="
                rounded-xl
                bg-white
                border border-slate-300
                focus:border-slate-900
                focus:ring-2 focus:ring-slate-900/20
                shadow-sm
                transition
              "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="
                rounded-xl
                bg-white
                border border-slate-300
                focus:border-slate-900
                focus:ring-2 focus:ring-slate-900/20
                shadow-sm
                transition
              "
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-md"
            >
              {loading ? "Signing in…" : "Login"}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-xs text-center text-slate-400">
            Your words are safe here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
