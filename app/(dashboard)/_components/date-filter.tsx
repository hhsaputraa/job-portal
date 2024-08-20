"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";

const DateFilter = () => {
  const data = [
    { value: "today", label: "Hari Ini" },
    { value: "yesterday", label: "Kemarin" },
    // { value: "thisweek", label: "Minggu Ini" },
    { value: "lastweek", label: "Minggu Ini" },
    { value: "thismonth", label: "Bulan Ini" },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const onChange = (value: string) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updatedQueryParams = {
      ...currentQueryParams,
      createdAtFilter: value,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQueryParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
  };

  return (
    <Select onValueChange={(selected) => onChange(selected)}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sortir berdasarkan waktu" />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DateFilter;
