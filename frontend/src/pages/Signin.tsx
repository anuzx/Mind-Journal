import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Brain } from "lucide-react";
import { signinUser } from "../api/auth";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { mutate: signinMutation, isPending } = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/dashboard");
    },
    onError: () => alert("Incorrect username or password."),
  });

  function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      alert("Both fields are required.");
      return;
    }
    signinMutation({ email, password });
  }

  return (
    <div
      className="min-h-screen bg-[#0B0E14] flex items-center justify-center px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-10">
          <Brain className="w-6 h-6 text-[#8B7CF6]" />
          <span
            className="text-xl font-medium text-[#ECE7DA]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Mind Journal
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#11151D] border border-white/10 rounded-2xl p-8 shadow-[0_0_60px_-15px_rgba(139,124,246,0.25)]">
          <h1
            className="text-xl font-medium text-[#ECE7DA] mb-1"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Welcome back
          </h1>
          <p className="text-sm text-[#6B7280] mb-6">Sign in to your vault.</p>
          <Input
            reference={emailRef}
            placeholder="you@example.com"
            label="Email"
          />

          <Input
            reference={passwordRef}
            placeholder="••••••••"
            type="password"
            label="Password"
          />

          <div className="mt-6">
            <Button
              variant="primary"
              text={isPending ? "Signing in…" : "Sign in"}
              onClick={signin}
              loading={isPending}
              fullWidth
            />
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            No account?{" "}
            <NavLink
              to="/signup"
              className="text-[#8B7CF6] hover:text-[#A395FF] transition-colors"
            >
              Create one
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
