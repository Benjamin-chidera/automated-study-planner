import { create } from "zustand";

interface UploadStore {
  isPlanGenerated: boolean;
  setIsPlanGenerated: (value: boolean) => void;

  isCheckingPlan: boolean;
  setIsCheckingPlan: (value: boolean) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  isPlanGenerated: false,
  setIsPlanGenerated: (value) => set(() => ({ isPlanGenerated: value })),

  isCheckingPlan: false,
  setIsCheckingPlan: (value) => set(() => ({ isCheckingPlan: value })),

  loading: false,
  setLoading: (value) => set(() => ({ loading: value })),
}));
