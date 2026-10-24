export type StatusOrbVariant = "progress" | "complete" | "neutral" | "sunset";

type StatusOrbProps = {
  label: string;
  variant?: StatusOrbVariant;
};

const variantStyles: Record<StatusOrbVariant, string> = {
  progress: "water-drop-pill text-on-surface",
  complete: "water-drop-pill text-on-surface",
  neutral: "water-drop-pill text-on-surface-variant",
  sunset: "water-drop-pill text-on-surface",
};

export function StatusOrb({ label, variant = "neutral" }: StatusOrbProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight ${variantStyles[variant]}`}
    >
      <span className="size-2 rounded-full bg-primary" aria-hidden />
      {label}
    </span>
  );
}
