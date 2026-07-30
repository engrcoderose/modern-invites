export interface GuestMutationState {
  status: "idle" | "success" | "error";
  message?: string;
}

export type GuestMutationAction = (
  previousState: GuestMutationState,
  formData: FormData,
) => Promise<GuestMutationState>;

export const initialGuestMutationState: GuestMutationState = {
  status: "idle",
};
