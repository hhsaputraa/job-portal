"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import SearchContainer from "@/components/search-container";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const isAdminPage = pathname?.startsWith("/admin");
  const isPlayerPage = pathname?.startsWith("/jobs");
  const isSearchPage = pathname?.startsWith("/search");

  const isAdmin = () => {
    return user?.publicMetadata?.role === "admin";
  };

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:flex w-full px-2 pr-8 item center gap-x-6">
          <SearchContainer />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isAdminPage || isPlayerPage ? (
          <Link href={"/"}>
            <Button variant={"outline"} size={"sm"} className="border-purple-700/20">
              <LogOut />
              Exit
            </Button>
          </Link>
        ) : (
          <>
            {isAdmin() && (
              <Link href={"/admin/jobs"}>
                <Button variant={"outline"} size={"sm"} className="border-purple-700/20">
                  Dashboard Admin
                </Button>
              </Link>
            )}
          </>
        )}

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
