"use client";

import { Bookmark, Compass, Home, List, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SideBarRoutesItem from "./side-bar-route-item";
import Box from "@/components/box";
import { Separator } from "@/components/ui/separator";
import DateFilter from "./date-filter";
import CheckBoxContainer from "./checkbox-container";
import qs from "query-string";

const adminRoutes = [
  {
    icon: List,
    label: "Jobs",
    href: "/admin/jobs",
  },
  {
    icon: List,
    label: "Companies",
    href: "/admin/companies",
  },
  {
    icon: Compass,
    label: "Analytics",
    href: "/admin/analytics",
  },
];

const guestRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Compass,
    label: "Search",
    href: "/search",
  },
  {
    icon: User,
    label: "Profile",
    href: "/user",
  },
  {
    icon: Bookmark,
    label: "Saved Jobs",
    href: "/savedJobs",
  },
];

const ShiftTimingsData = [
  {
    value: "penuh-waktu",
    label: "Penuh Waktu",
  },
  {
    value: "contract",
    label: "Kontrak",
  },
  {
    value: "paruh-waktu",
    label: "Part Time",
  },
  {
    value: "magang",
    label: "Magang",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname?.startsWith("/admin");
  const isSearchPage = pathname?.startsWith("/search");
  const routes = isAdminPage ? adminRoutes : guestRoutes;

  const handleShiftTimingChange = (shiftTimings: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updateQueryParams = {
      ...currentQueryParams,
      shiftTiming: shiftTimings,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updateQueryParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SideBarRoutesItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}

      {isSearchPage && (
        <Box classname="px-4 py-4 items-start justify-start space-y-4 flex-col">
          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">Filters</h2>

          {/* filter the data by createdAt */}
          <DateFilter />

          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">Jenis Loker</h2>
          <CheckBoxContainer data={ShiftTimingsData} onChange={handleShiftTimingChange} />
        </Box>
      )}
    </div>
  );
};

export default SidebarRoutes;
