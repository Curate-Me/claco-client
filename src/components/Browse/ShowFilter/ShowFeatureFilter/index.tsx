interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
}

export const ShowFeatureFilter = ({
  isChecked,
  children = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center rounded-[5px] py-3 px-7 ${
        isChecked
          ? "body2-semibold bg-grayscale-80 text-grayscale-20"
          : "body2-medium bg-grayscale-30 text-grayscale-80"
      }`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};
