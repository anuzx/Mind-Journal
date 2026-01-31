import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function signin() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) {
        alert("Username and password required");
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      // ✅ redirect after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
      alert("Invalid credentials");
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-8">
          <Button variant="primary" text="Signin" onClick={signin} />
        </div>

        <div className="mt-6 text-center">
          <p className="my-2">Don't have an account?</p>
          <p
            className="text-blue-500 hover:text-blue-400 hover:cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Create account
          </p>
        </div>
      </div>
    </div>
  );
}
