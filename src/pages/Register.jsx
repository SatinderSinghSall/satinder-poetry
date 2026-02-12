import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ---------- validation ---------- */
  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!form.email.includes("@"))
      newErrors.email = "Please enter a valid email.";

    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

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
      await API.post("/auth/register", form);

      navigate("/login", {
        state: { message: "Account created successfully. Please log in." },
      });
    } catch {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/images/main-background.jpg')",
        }}
      />

      {/* softer blur like login */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2.5px]" />

      {/* loading */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}

      {/* card */}
      <Card
        className="
          relative z-10
          w-full max-w-md
          rounded-3xl
          bg-white/85
          border border-white/40
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
        "
      >
        <CardContent className="p-8 sm:p-10">
          {/* header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800">
              Create Account
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Begin your journey with words.
            </p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* name */}
            <div>
              <Input
                placeholder="Full name"
                className="
                  rounded-xl
                  bg-white
                  border border-slate-300
                  focus:border-slate-900
                  focus:ring-2 focus:ring-slate-900/20
                  shadow-sm
                "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* email */}
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
                "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* password */}
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
                "
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-md"
            >
              {loading ? "Creating account…" : "Register"}
            </Button>
          </form>

          {/* footer */}
          <p className="mt-8 text-xs text-center text-slate-400">
            Your words belong here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
