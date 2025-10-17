export type ButtonStyle = keyof typeof ButtonStyle;
export const ButtonStyle = {
  CURRENTLY_PICKED: "CURRENTLY_PICKED",
  PREVIOUSLY_PICKED: "PREVIOUSLY_PICKED",
  PICK_FORBIDDEN: "PICK_FORBIDDEN",
  DEFAULT: "DEFAULT",
} as const;
