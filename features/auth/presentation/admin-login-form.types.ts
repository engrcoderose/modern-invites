export interface AdminLoginFormState {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
}

export type AdminLoginAction = (
  previousState: AdminLoginFormState,
  formData: FormData,
) => Promise<AdminLoginFormState>;

export const initialAdminLoginFormState: AdminLoginFormState = {
  status: "idle",
};
