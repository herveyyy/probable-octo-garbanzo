import React from "react";
import { useButtonStyles, type ButtonVariant } from "./button.hooks";

interface Props {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  type = "button",
  className,
  onClick,
  disabled,
}) => {
  const styles = [useButtonStyles(variant), className].filter(Boolean).join(" ");
  return (
    <button type={type} className={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
