"use client";

import { Company, Job } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Box from "@/components/box";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, BriefcaseBusiness, Currency, Layers, Loader2, Network } from "lucide-react";
import { cn, formattedString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface JobCardItemProps {
  job: Job;
  userId: string | null;
}

const JobCardItem = ({ job, userId }: JobCardItemProps) => {
  const typeJob = job as Job & {
    company: Company | null;
  };

  const company = typeJob.company;

  const [isBookmarkLoading, setisBookmarkLoading] = useState(false);
  const SavedUsersIcon = BookmarkCheck;

  return (
    <motion.div layout>
      <Card>
        <div className="w-full h-full p-4 flex flex-col items-start justify-start gap-y-4 ">
          {/* saved user */}
          <Box>
            <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(job.CreatedAt), { addSuffix: true })}</p>

            <Button variant={"ghost"} size={"icon"}>
              {isBookmarkLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SavedUsersIcon className={cn("w-4 h-4 ")} />}
            </Button>
          </Box>

          {/* company details */}
          <Box classname="items-center justify-start gap-x-4">
            <div className="w-12 h-12 min-w-12 min-h-12 border p-2 rounded-md relative flex items-center justify-center overflow-hidden ">
              {company?.logo && <Image alt={company?.name} src={company?.logo} width={40} height={40} className="object-contain" />}
            </div>
            <div className="w-full">
              <p className="text-stone-700 font-semibold text-base w-full truncate">{job.title}</p>
              <Link href={`/company/${company?.id}`} className="text-xs text-customGreen-500 w-full truncate">
                {company?.name}
              </Link>
            </div>
          </Box>
          {/* job details */}
          <Box>
            {job.shiftTiming && (
              <div className="text-xs text-muted-foreground flex items-center">
                <BriefcaseBusiness className="w-3 h-3 mr-1" />
                {formattedString(job.shiftTiming)}
              </div>
            )}
            {job.workMode && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Layers className="w-3 h-3 mr-1" />
                {formattedString(job.workMode)}
              </div>
            )}

            {job.hourlyRate && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Currency className="w-3 h-3 mr-1" />
                {formattedString(job.hourlyRate)}
              </div>
            )}

            {job.yearsOfExperience && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Network className="w-3 h-3 mr-1" />
                {formattedString(job.yearsOfExperience)}
              </div>
            )}
          </Box>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCardItem;
