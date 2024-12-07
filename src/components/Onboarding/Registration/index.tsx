import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
}

export const TypeButton = ({
  isChecked,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        `min-w-[8rem] items-center justify-center rounded-[0.31rem] body1-medium py-[18px] ${
          isChecked
            ? "bg-grayscale-80 text-dark"
            : "bg-grayscale-30 text-grayscale-80"
        }`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const ConceptButton = ({
  isChecked,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        `items-center justify-center py-[42px] rounded-[5px] body1-medium ${
          isChecked
            ? "bg-grayscale-80 text-dark"
            : "bg-grayscale-30 text-grayscale-80"
        }`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const FeatureButton = ({
  isChecked,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        `flex flex-row max-w-full max-h-40 p-[19px] rounded-[5px] ${
          isChecked ? "bg-grayscale-80 text-dark" : "bg-grayscale-30 text-white"
        }`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
