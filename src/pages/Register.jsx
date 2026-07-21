import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthToast from "@/components/AuthToast";

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
      newErrors.email = "Please enter a valid email address.";

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

      localStorage.setItem("hasAccount", "true");

      setErrors({});

      const successToast = toast.custom(
        () => (
          <AuthToast
            type="success"
            title="Account Created"
            message="Your account has been created successfully."
          />
        ),
        {
          duration: 5000,
        },
      );

      setTimeout(() => {
        toast.dismiss(successToast);

        toast.custom(
          () => (
            <AuthToast
              type="info"
              title="Check Your Inbox"
              message="We've sent you a welcome email with onboarding details."
            />
          ),
          {
            duration: 5000,
          },
        );
      }, 4000);

      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";

      setErrors({ general: message });

      toast.custom(() => (
        <AuthToast type="error" title="Registration Failed" message={message} />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 select-none">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/main-background.jpg')",
        }}
      />

      {/* Subtle Backdrop Darkener */}
      <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]" />

      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-900 border-t-transparent" />
        </div>
      )}

      {/* Main Elevated Card */}
      <Card
        className="
          relative z-10 
          w-full max-w-[480px] sm:max-w-[510px]
          rounded-[36px] 
          bg-[#fcfaf7]/95
          shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)]
          backdrop-blur-md
          border border-white/80
          transition-all duration-300
        "
      >
        <CardContent className="p-9 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-[2.65rem] font-serif tracking-tight text-amber-950 font-normal">
              Create Account
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-sans font-medium">
              Begin your journey with words.
            </p>
          </div>

          {/* Premium General Error Banner */}
          {errors.general && (
            <div className="relative flex items-center justify-between gap-3 bg-red-50/90 border border-red-200/80 text-red-900 text-xs sm:text-sm p-4 rounded-2xl mb-6 shadow-sm backdrop-blur-sm animate-fadeIn">
              <div className="flex items-center gap-3 pr-2">
                <AlertCircle className="size-5 text-red-600 shrink-0" />
                <span className="font-medium leading-tight">
                  {errors.general}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setErrors((prev) => ({ ...prev, general: null }))
                }
                className="text-red-400 hover:text-red-700 hover:bg-red-100/60 p-1 rounded-full transition-colors shrink-0 cursor-pointer"
                aria-label="Dismiss error"
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 size-5 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Full name"
                  className="
                    h-13 sm:h-14 rounded-full
                    bg-white
                    border-stone-300/80
                    text-stone-900 text-base placeholder:text-stone-400
                    focus-visible:border-amber-900 focus-visible:ring-1 focus-visible:ring-amber-900/30
                    shadow-inner transition-all duration-200
                    pl-12 pr-5
                  "
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 mt-1.5 ml-5 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 size-5 pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Email address"
                  className="
                    h-13 sm:h-14 rounded-full
                    bg-white
                    border-stone-300/80
                    text-stone-900 text-base placeholder:text-stone-400
                    focus-visible:border-amber-900 focus-visible:ring-1 focus-visible:ring-amber-900/30
                    shadow-inner transition-all duration-200
                    pl-12 pr-5
                  "
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1.5 ml-5 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 size-5 pointer-events-none" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="
                    h-13 sm:h-14 rounded-full
                    bg-white
                    border-stone-300/80
                    text-stone-900 text-base placeholder:text-stone-400
                    focus-visible:border-amber-900 focus-visible:ring-1 focus-visible:ring-amber-900/30
                    shadow-inner transition-all duration-200
                    pl-12 pr-12
                  "
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="cursor-pointer" size={18} /> : <Eye className="cursor-pointer" size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-600 mt-1.5 ml-5 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="
                w-full h-13 sm:h-14 mt-2
                rounded-full
                bg-[#121824] hover:bg-stone-900 
                text-white text-sm font-semibold tracking-wider uppercase
                shadow-lg hover:shadow-xl
                transition-all duration-200 active:scale-[0.98]
                disabled:opacity-70 cursor-pointer
              "
            >
              {loading ? "Creating account…" : "Register"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-7 text-center">
            <p className="text-sm text-stone-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="
                  font-bold
                  text-amber-950
                  hover:text-black
                  transition-colors
                  underline underline-offset-2
                "
              >
                Login
              </Link>
            </p>
          </div>

          {/* Footer Note */}
          <p className="mt-7 text-xs text-center text-stone-500 tracking-tight font-medium">
            Your words belong here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
