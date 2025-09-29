import { cva, type VariantProps } from "class-variance-authority";
import { CircleArrowRight } from "lucide-react";
import type * as React from "react";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-in-out group focus:outline-none focus:ring-2 focus:ring-soypoy-accent focus:ring-offset-2 bg-soypoy-main hover:bg-soypoy-accent border-soypoy-secondary border-2 hover:border-soypoy-main ",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface WhatUpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  title: string;
  prefix?: string;
  asChild?: boolean;
}

export default function WhatUpButton({
  className,
  variant,
  size,
  title,
  prefix,
  asChild = false,
  ...props
}: WhatUpButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2 px-2">
          <span className="pl-2 font-bernard-mt text-lg md:text-2xl text-soypoy-accent group-hover:text-soypoy-main transition-colors duration-300">
            {prefix}
          </span>
          <div className="font-anymale font-bold text-4xl md:text-5xl uppercase text-soypoy-secondary group-hover:text-soypoy-main transition-colors duration-300">
            <span className="text-5xl md:text-6xl">{title[0]}</span>
            {title.slice(1)}
          </div>
        </div>
        <div className="flex items-center px-2">
          <CircleArrowRight className="w-5 h-5 text-soypoy-secondary group-hover:text-soypoy-main transition-colors duration-300" />
        </div>
      </div>
    </button>
  );
}
