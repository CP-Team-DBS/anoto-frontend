import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const containerVariants = cva("mx-auto px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-7xl",
      sm: "max-w-6xl",
    },
  },
});

export default function Container({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return (
    <div className={cn(containerVariants({ size, className }))} {...props}>
      {children}
    </div>
  );
}
