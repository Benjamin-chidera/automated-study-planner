export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

// src/types/rules.ts
// src/types/rules.ts
export interface FormStates {
  message: string;
  errors?: {
    user?: string;
    oldPassword?: string;
    name?: string[] | string;
    email?: string[] | string;
    password?: string[] | string;
  };
}

export interface ContactFormState {
  message: string;
  errors?: {
    name?: string[] | string;
    email?: string[] | string;
    subject?: string[] | string;
    message?: string[] | string;
  };
}

// Define the DeleteState interface
export interface DeleteState {
  message: string;
  errors?: {
    uploadId?: string;
    userId?: string | null;
  };
}
