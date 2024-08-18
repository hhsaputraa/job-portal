"use client";

import { cn } from "@/lib/utils";

interface BoxProps {
  children: React.ReactNode;
  classname?: string;
}

const Box = ({ children, classname }: BoxProps) => {
  return <div className={cn("flex items-center justify-center w-full ", classname)}>{children}</div>;
};

export default Box;
