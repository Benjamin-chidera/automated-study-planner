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