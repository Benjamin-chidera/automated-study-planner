"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex justify-center items-center gap-7">
      <section className="flex-1">
        <h1 className=" font-bold text-4xl mb-10">Get started for free</h1>

        <form action="" className=" space-y-5 w-full">
          <div className="grid w-full max-w-lg md:max-w-full items-center gap-3">
            <Label htmlFor="fullname">FullName</Label>
            <Input
              type="fullname"
              id="fullname"
              placeholder="FullName"
              className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0"
            />
          </div>

          <div className="grid w-full max-w-lg md:max-w-full items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0"
            />
          </div>

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

          <Button className=" w-full bg-blue-600 max-w-lg md:max-w-full py-3 text-white font-bold mt-5 rounded-full cursor-pointer">
            Sign up
          </Button>
        </form>

        <p className="mt-5 text-center max-w-lg md:max-w-full text-sm">
          Or continue with
        </p>

        <div className=" text-center max-w-lg md:max-w-full mt-7">
          <Button className=" hover:bg-blue-600 hover:text-white font-bold w-full rounded-full cursor-pointer">
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
          <p>Already have an account? </p>{" "}
          <Link href={"/login"} className=" font-bold hover:text-blue-600">
            Login
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
          />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
