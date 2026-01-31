import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { mutate: signupMutation } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      alert("You have signed up");
      navigate("/signin");
    },
    onError: (error) => {
      console.error(error);
      alert("Signup failed");
    },
  });

  //mutate(variables) ,here variables are passed to mutationFn

  function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !password) {
      alert("All fields required");
      return;
    }

    signupMutation({ username, password }); //signpMutation(data) , data is from auth.js
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
