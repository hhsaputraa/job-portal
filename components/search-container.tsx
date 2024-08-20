"use client";

import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

const SearchContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const createdAtFilter = searchParams.get("createdAtFilter");
  const currentShiftTiming = searchParams.get("ShiftTiming");
  const currentWorkMode = searchParams.get("WorkMode");

  const [value, setValue] = useState(currentTitle || "");

  const debounceValue = useDebounce(value);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debounceValue,
          categoryId: currentCategoryId,
          createdAtFilter: createdAtFilter,
          ShiftTiming: currentShiftTiming,
          WorkMode: currentWorkMode,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
  }, [debounceValue, currentCategoryId, router, pathname, createdAtFilter, currentShiftTiming, currentWorkMode]);
  return (
    <>
      <div className="flex items-center gap-x-2 relative flex-1">
        <Search className="h-4 w-4 text-neutral-600 absolute left-3" />
        <Input placeholder="Search for Job Using Title" value={value} onChange={(e) => setValue(e.target.value)} className="w-full pl-9 rounded-lg bg-customGreen-100/80 focus-visible:ring-customGreen-200 text-sm" />

        {value && (
          <Button variant={"ghost"} size={"icon"} type="button" onClick={() => setValue("")} className="cursor-pointer absolute right-3 hover:scale-125 hover:bg-transparent">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </>
  );
};

export default SearchContainer;
