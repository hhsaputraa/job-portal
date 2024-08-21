"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface AppliedFiltersProps {
  categories: Category[];
}

const AppliedFilters = ({ categories }: AppliedFiltersProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = Object.fromEntries(searchParams.entries());

  const shiftTimingParams = Object.fromEntries(Object.entries(currentParams).filter(([key]) => key === "shiftTiming"));

  const workingModeParams = Object.fromEntries(Object.entries(currentParams).filter(([key]) => key === "workMode"));

  const getCategoryName = (categoryId: string | null) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  if (searchParams.size === 0) return null;
  return (
    <>
      <div className="mt-4 flex items-center gap-4">
        {shiftTimingParams &&
          Object.entries(shiftTimingParams).map(([key, value]) => (
            <>
              {value.split(",").map((item) => (
                <Button
                  variant={"outline"}
                  type="button"
                  key={item}
                  className="flex items-center gap-x-2 text-neutral-500 px-2 py-1 rounded-md bg-customGreen-100/80 border-customGreen-200 capitalize cursor-pointer hover:bg-customGreen-100"
                >
                  {item}
                </Button>
              ))}
            </>
          ))}

        {workingModeParams &&
          Object.entries(workingModeParams).map(([key, value]) => (
            <>
              {value.split(",").map((item) => (
                <Button
                  variant={"outline"}
                  type="button"
                  key={item}
                  className="flex items-center gap-x-2 text-neutral-500 px-2 py-1 rounded-md bg-customGreen-100/80 border-customGreen-200 capitalize cursor-pointer hover:bg-customGreen-100"
                >
                  {item}
                </Button>
              ))}
            </>
          ))}

        {searchParams.get("categoryId") && (
          <Button variant={"outline"} type="button" className="flex items-center gap-x-2 text-neutral-500 px-2 py-1 rounded-md bg-customGreen-100/80 border-customGreen-200 capitalize cursor-pointer hover:bg-customGreen-100">
            {getCategoryName(searchParams.get("categoryId"))}
          </Button>
        )}
      </div>

      {searchParams.get("title") && (
        <div className="flex items-center justify-center flex-col my-4">
          <h2 className="text-3xl text-muted-foreground">
            Kamu Mencari :<span className="font-bold text-neutral-900 capitalize">{searchParams.get("title")}</span>
          </h2>
        </div>
      )}
    </>
  );
};

export default AppliedFilters;
