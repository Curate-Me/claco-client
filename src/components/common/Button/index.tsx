import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
}

export const ConfirmButton = ({
  isChecked,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        `flex items-center justify-center px-[7.5rem] py-[0.88rem] rounded-[0.3125rem] body1-medium ${
          isChecked
            ? "bg-primary text-grayscale-90"
            : "bg-grayscale-20 text-grayscale-60"
        }`,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
