"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-block px-8 py-3 font-medium text-center border-2 transition-colors duration-300";

  const variantStyles = {
    primary:
      "border-white text-white bg-transparent hover:bg-white hover:text-black",
    outline: "border-white text-white bg-transparent hover:bg-white/10",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}
