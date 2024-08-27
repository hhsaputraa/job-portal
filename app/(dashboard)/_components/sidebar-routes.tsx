"use client";

import { Bookmark, BriefcaseBusiness, Building2, Home, Search, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SideBarRoutesItem from "./side-bar-route-item";
import Box from "@/components/box";
import { Separator } from "@/components/ui/separator";
import DateFilter from "./date-filter";
import CheckBoxContainer from "./checkbox-container";
import qs from "query-string";

const adminRoutes = [
  {
    icon: BriefcaseBusiness,
    label: "Loker",
    href: "/admin/jobs",
  },
  {
    icon: Building2,
    label: "Nama Perusahaan",
    href: "/admin/companies",
  },
  // {
  //   icon: Compass,
  //   label: "Analytics",
  //   href: "/admin/analytics",
  // },
];

const guestRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Search,
    label: "Eksplor",
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

const workingModesData = [
  {
    value: "onsite",
    label: "On Site",
  },
  {
    value: "remote",
    label: "Remote",
  },
  {
    value: "hybrid",
    label: "Hybrid",
  },
];

const experienceData = [
  {
    value: "0_tier",
    label: "Freshgraduate/Mahasiswa Tingkat Akhir",
  },
  {
    value: "1_tier",
    label: "1 - 2 tahun",
  },
  {
    value: "2_tier",
    label: "3 - 4 tahun",
  },
  {
    value: "3_tier",
    label: "Lebih dari 5 tahun",
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

  const handleWorkingModes = (workingModes: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updateQueryParams = {
      ...currentQueryParams,
      workMode: workingModes,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updateQueryParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "comma",
      }
    );

    router.push(url);
  };

  const handleExperience = (experience: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updateQueryParams = {
      ...currentQueryParams,
      yearsOfExperience: experience,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updateQueryParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "comma",
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

          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">Tipe</h2>
          <CheckBoxContainer data={workingModesData} onChange={handleWorkingModes} />

          <Separator />
          <h2 className="text-lg text-muted-foreground tracking-wide">Pengalaman</h2>
          <CheckBoxContainer data={experienceData} onChange={handleExperience} />
        </Box>
      )}
    </div>
  );
};

export default SidebarRoutes;
