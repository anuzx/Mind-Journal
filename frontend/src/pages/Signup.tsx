import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement |null>(null);
  const passwordRef = useRef<HTMLInputElement| null >(null);
  const navigate = useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/user/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("you have signed up");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-8">
          <Button variant="primary" text="Signup" onClick={signup} />
        </div>
        <div>
          <p className="mt-8 ml-8 my-2">Already have an account?</p>
          <div>
            <p
              className="text-center text-blue-500 hover:text-blue-400 hover:cursor-pointer underline"
              onClick={() => navigate("/signin")}
            >
              SignIn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
