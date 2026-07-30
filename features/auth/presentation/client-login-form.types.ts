export interface ClientLoginFormState {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: {
    email?: string[];
    accessCode?: string[];
  };
}

export type ClientLoginAction = (
  previousState: ClientLoginFormState,
  formData: FormData,
) => Promise<ClientLoginFormState>;

export const initialClientLoginFormState: ClientLoginFormState = {
  status: "idle",
};
