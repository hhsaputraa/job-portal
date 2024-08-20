"use client";

import { Bookmark, Compass, Home, List, User } from "lucide-react";
import { usePathname } from "next/navigation";
import SideBarRoutesItem from "./side-bar-route-item";
import Box from "@/components/box";
import { Separator } from "@/components/ui/separator";
import DateFilter from "./date-filter";

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

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isSearchPage = pathname?.startsWith("/search");
  const routes = isAdminPage ? adminRoutes : guestRoutes;

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
        </Box>
      )}
    </div>
  );
};

export default SidebarRoutes;
