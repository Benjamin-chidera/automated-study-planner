import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProfileStore from "@/app/store/profile-store";

export const EditProfile = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
  } = useProfileStore();

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white p-2 font-bold rounded-full mt-3">
            <Pencil size={15} />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit Info</DialogTitle>
            <DialogDescription className=" flex flex-col gap-2 mt-5">
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0"
              />
            </DialogDescription>

            <DialogDescription className=" flex flex-col gap-2 mt-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0"
              />
            </DialogDescription>

            <DialogDescription className=" flex flex-col gap-2 mt-2">
              <Label>Old Password</Label>
              <Input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0"
              />
            </DialogDescription>

            <DialogDescription className=" flex flex-col gap-2 mt-2">
              <Label>New Password</Label>
              <Input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};
