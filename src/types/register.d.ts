// types.ts or inside the same file
export type RegisterErrors = {
  fullname?: string[];
  email?: string[];
  password?: string[];
  general?: string[];
};


export type LoginErrors = {
  email?: string[];
  password?: string[];
  general?: string[];
};
