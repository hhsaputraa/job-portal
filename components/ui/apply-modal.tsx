"use client";

import { Resumes, UserProfile } from "@prisma/client";
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import Box from "../box";
import Link from "next/link";
import { Button } from "./button";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  userProfile: (UserProfile & { resumes: Resumes[] }) | null;
}

export const ApplyModal = ({ isOpen, onClose, onConfirm, loading, userProfile }: ApplyModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title="Apa Anda Yakin?" description="aksi ini tidak disimpan" isOpen={isOpen} onClose={onClose}>
      <Box>
        <div className="grid grid-cols-2 gap-2 w-full">
          <label className="p-3 border rounded-md">{userProfile?.fullName}</label>
          <label className="p-3 border rounded-md">{userProfile?.contact}</label>
          <label className="p-3 border rounded-md col-span-2">{userProfile?.email}</label>
          <label className="p-3 border rounded-md col-span-2 flex items-center gap-2 whitespace-nowrap">
            CV anda :{""}
            <span className="text-customGreen-600 w-full truncate">{userProfile?.resumes.find((resume) => resume.id === userProfile?.activeResumeId)?.name}</span>
          </label>

          <div className="col-span-2 flex items-center justify-end text-sm text-muted-foreground">
            Change your details <Link href={"/user"} className="text-purple-700 ml-2"></Link>
          </div>
        </div>
      </Box>

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} className="bg-customGreen-700 hover:bg-customGreen-800" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
