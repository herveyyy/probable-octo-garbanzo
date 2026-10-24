export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "sunset"
  | "electric";

export function useButtonStyles(variant: ButtonVariant = "primary") {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variantStyle: Record<ButtonVariant, string> = {
    primary: "water-drop-button-primary",
    secondary: "water-drop-button-secondary",
    danger: "bg-error text-on-error hover:opacity-90 shadow-xs",
    success: "water-drop-button-primary",
    sunset: "water-drop-button-secondary",
    electric: "water-drop-button-primary",
  };

  return `${baseStyle} ${variantStyle[variant]}`;
}

export function useAuthFormSubmitStyles() {
  return `${useButtonStyles("primary")} w-full`;
}
