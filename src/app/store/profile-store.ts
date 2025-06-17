import { create } from "zustand";

interface ProfileStore {
  name: string;
  setName: (name: string) => void;

  email: string;
  setEmail: (email: string) => void;

  oldPassword: string;
  setOldPassword: (password: string) => void;

  newPassword: string;
  setNewPassword: (password: string) => void;
}

const useProfileStore = create<ProfileStore>((set) => ({
  name: "",
  setName: (name: string) => set(() => ({ name })),

  email: "",
  setEmail: (email: string) => set(() => ({ email })),

  oldPassword: "",
  setOldPassword: (password: string) => set(() => ({ oldPassword: password })),

  newPassword: "",
  setNewPassword: (password: string) => set(() => ({ newPassword: password })),
}));

export default useProfileStore;