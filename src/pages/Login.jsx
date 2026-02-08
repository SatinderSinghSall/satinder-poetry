import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/api/api";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const newErrors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

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

  /* ---------------- UI ---------------- */

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/images/main-background.jpg')",
        }}
      />

      {/* lighter overlay (LESS blur) */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />

      {/* loading screen */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}

      {/* card */}
      <Card className="relative z-10 w-full max-w-md rounded-3xl bg-white/90 shadow-2xl backdrop-blur-sm">
        <CardContent className="p-10">
          <h2 className="text-3xl font-serif text-center mb-8">Welcome Back</h2>

          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-900 text-white hover:bg-slate-800"
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
