"use client";

import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(login, undefined);
  const { status } = useSession();
  // console.log(status);

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/upload";
    }
  }, [status]);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/upload" });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <main className="lg:flex justify-center items-center gap-7">
      <section className="flex-1">
        <h1 className=" font-bold text-4xl mb-10">Welcome Back</h1>

        <form action={action} className=" space-y-5 w-full">
          <div className="grid w-full max-w-lg md:max-w-full items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              defaultValue={state?.email as string}
              className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0"
            />
            {state?.errors?.email && (
              <p className=" text-red-500 text-xs">{state?.errors?.email}</p>
            )}
          </div>

          <div>
            <div className="grid w-full max-w-lg md:max-w-full items-center gap-3 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                name="password"
                className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0 pr-9"
              />

              <div className=" absolute right-1 bottom-0.5">
                <Button
                  onClick={handleShow}
                  type="button"
                  className=" cursor-pointer"
                >
                  {!showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
            </div>

            {state?.errors?.password && (
              <p className=" text-red-500 text-xs">{state?.errors?.password}</p>
            )}
          </div>

          <Button
            disabled={pending}
            className=" w-full bg-blue-600 max-w-lg md:max-w-full py-3 text-white font-bold mt-5 rounded-full cursor-pointer"
          >
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-5 text-center max-w-lg md:max-w-full text-sm">
          Or continue with
        </p>

        <div className=" text-center max-w-lg md:max-w-full mt-7">
          <Button
            className=" hover:bg-blue-600 hover:text-white font-bold w-full rounded-full cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <Image
              src={"/google-img.png"}
              width={20}
              height={20}
              alt="Google auth"
            />
            Continue With Google
          </Button>
        </div>

        <div className="flex gap-3 text-sm mt-5 items-center">
          <p>Don’t have an account? </p>{" "}
          <Link href={"/register"} className=" font-bold hover:text-blue-600">
            Register
          </Link>
        </div>
      </section>

      <section className="hidden xl:block lg:flex-1">
        <div className=" w-full">
          <Image
            src={"/auth-img.png"}
            alt="auth image"
            width={500}
            height={500}
            className=" w-full h-[400px] lg:h-[700px]"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
