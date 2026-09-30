import { cva } from "class-variance-authority";

const button = cva(
  [
    "font-bold",
    "px-6",
    "duration-200",
    "text-[13px]",
    "border",
    "rounded",
    "cursor-pointer",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-white",
          "bg-main-purple",
          "border-transparent",
          "hover:bg-main-purple-hover",
        ],
        secondary: [
          "bg-main-purple/10",
          "text-main-purple",
          "border-gray-400",
          "hover:bg-main-purple/25",
        ],
        destructive: ["text-white", "bg-red", "hover:bg-red-hover"],
      },
      size: {
        s: ["h-10"],
        m: ["h-12"],
      },
      isFullWidth: {
        true: "w-full",
      },
      isDisabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        size: "m",
        class: "capitalize",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "m",
      isDisabled: false,
    },
  },
);

const Button = ({
  children,
  size,
  variant,
  isFullWidth,
  isDisabled,
  className,
  ...props
}) => {
  return (
    <button
      className={button({ variant, size, isFullWidth, isDisabled, className })}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
