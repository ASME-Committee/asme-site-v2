import { cn } from "@/lib/cn";
import { type HTMLAttributes } from "react";

/**
 * Page gutter and measure. `container-x` is a styling hook with no rules of its
 * own: inside a `.panel` the panel already supplies the width and padding, so
 * globals.css uses this class to switch the container's own gutters off rather
 * than every section needing a variant.
 */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("container-x mx-auto w-full max-w-[1120px] px-5 lg:px-8", className)}
      {...rest}
    />
  );
}
