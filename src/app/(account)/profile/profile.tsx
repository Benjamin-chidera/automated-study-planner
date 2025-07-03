/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/profile/page.tsx
"use client";

import { editProfile } from "@/app/actions/profile";
import useProfileStore from "@/app/store/profile-store";
import { EditProfile } from "@/components/modals/edit-profile/edit-profile";
import { Button } from "@/components/ui/button";
import { FormStates } from "@/types/rules";
import { SessionPayload } from "@/types/session";
import Image from "next/image";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ProfileProps {
  user: SessionPayload | undefined;
  userProfile: any;
}

const Profile = ({ user, userProfile }: ProfileProps) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, action, pending] = useActionState<
    FormStates | undefined,
    FormData
  >(
    editProfile as (
      state: FormStates | undefined,
      formData: FormData
    ) => Promise<FormStates>,
    undefined
  );

  const { name, email, oldPassword, newPassword } = useProfileStore();

  useEffect(() => {
    if (state?.message) {
      if (state.errors) {
        if (state.errors.user) toast.error(state.errors.user);
        if (state.errors.oldPassword) toast.error(state.errors.oldPassword);
        toast.error(state.message);
      } else {
        toast.success(state.message);
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  }, [state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const hasChanges =
    image ||
    (name && name.trim() !== "") ||
    (email && email.trim() !== "") ||
    (oldPassword && oldPassword.trim() !== "") ||
    (newPassword && newPassword.trim() !== "");

  return (
    <main>
      <h1 className="font-bold text-xl">Account Settings</h1>

      <form action={action}>
        <section className="text-center">
          <input type="hidden" name="userId" value={user?.userId} />
          <input type="hidden" name="fullname" value={name} />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="oldPassword" value={oldPassword} />
          <input type="hidden" name="newPassword" value={newPassword} />

          <div className="flex justify-center items-center py-6">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group border-2 border-indigo-500 shadow-lg"
              onClick={handleClick}
            >
              {image || userProfile.image ? (
                <Image
                  src={image || userProfile.image}
                  alt="Profile Image"
                  className="object-cover w-full h-full"
                  fill
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                  Upload
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 text-white flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition">
                Change
              </div>
            </div>

            <input
              name="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold">{user?.userName}</h1>
            <p className="text-gray-500 text-sm">{user?.userEmail}</p>
            <EditProfile />
          </div>

          {hasChanges && (
            <Button
              type="submit"
              disabled={pending}
              className="mt-3 bg-indigo-500 hover:bg-indigo-700 text-white p-2 font-bold rounded-full cursor-pointer"
            >
              {pending ? "Saving..." : "Save"}
            </Button>
          )}
        </section>
      </form>

      <section>
        <h1 className="text-xl font-bold mt-20 mb-5">Upload History</h1>
      </section>
    </main>
  );
};

export default Profile;
