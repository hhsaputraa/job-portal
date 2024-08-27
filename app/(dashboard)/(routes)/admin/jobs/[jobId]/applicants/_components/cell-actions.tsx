"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowUpDown, BadgeCheck, Ban, Eye, File, Loader, Loader2, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CellActionsProps {
  id: string;
  fullName: string;
  email: string;
}

const CellActions = ({ id, fullName, email }: CellActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRejection, setIsRejection] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoading ? (
          <DropdownMenuItem className="flex items-center justify-center">
            <Loader className="w-4 h-4 animate-spin" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="flex items-center justify-center">
            <BadgeCheck className="w-4 h-4 mr-2" />
            Dipilih
          </DropdownMenuItem>
        )}

        {isRejection ? (
          <DropdownMenuItem className="flex items-center justify-center">
            <Loader className="w-4 h-4 animate-spin" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="flex items-center justify-center">
            <Ban className="w-4 h-4 mr-2" />
            Ditolak
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
