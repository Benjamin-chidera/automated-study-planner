import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <main className=" flex items-center justify-between">
      <section className="">
        <h1 className=" font-bold text-4xl mb-5">Create an account</h1>

        <form action="" className="">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="fullname">FullName</Label>
            <Input type="fullname" id="fullname" placeholder="FullName" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
        </form>
      </section>

      <section className="">
        <Image src={"/auth-img.png"} height={300} width={300} alt="Auth Image" className=""/>
      </section>
    </main>
  );
};

export default RegisterPage;
