import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const newErrors = {};

    if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be 6+ characters";
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
      await API.post("/auth/register", form);

      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch {
      setErrors({ general: "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/images/main-background.jpg')",
        }}
      />

      {/* light overlay */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />

      {/* loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}

      {/* card */}
      <Card className="relative z-10 w-full max-w-md rounded-3xl bg-white/90 shadow-2xl backdrop-blur-sm">
        <CardContent className="p-10">
          <h2 className="text-3xl font-serif text-center mb-8">
            Create Account
          </h2>

          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* name */}
            <div>
              <Input
                placeholder="Full Name"
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
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* password */}
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
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
