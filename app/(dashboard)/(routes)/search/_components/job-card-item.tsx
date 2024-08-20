"use client";

import { Company, Job } from "@prisma/client";
import { Card, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import Box from "@/components/box";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, BriefcaseBusiness, Currency, Layers, Loader2, Network } from "lucide-react";
import { cn, formatHourlyRateLabel, formattedString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "lodash";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface JobCardItemProps {
  job: Job;
  userId: string | null;
}

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

const hourlyRate = [
  {
    value: "1-3_jt",
    label: "1 - 3 juta",
  },
  {
    value: "3-6_jt",
    label: "3 - 6 juta",
  },
  {
    value: "6jt_plus",
    label: "lebih dari 6 juta",
  },
  {
    value: "secompetitive",
    label: "Gaji Kompetitif",
  },
  {
    value: "secret",
    label: "Diinformasikan setelah proses rekrutmen",
  },
];

const JobCardItem = ({ job, userId }: JobCardItemProps) => {
  const typeJob = job as Job & {
    company: Company | null;
  };

  const company = typeJob.company;

  const [isBookmarkLoading, setisBookmarkLoading] = useState(false);

  const isSavedByUser = userId && job.savedUsed?.includes(userId);
  const SavedUsersIcon = isSavedByUser ? BookmarkCheck : Bookmark;
  const router = useRouter();

  const onClickSaveJob = async () => {
    try {
      setisBookmarkLoading(true);
      if (isSavedByUser) {
        await axios.patch(`/api/jobs/${job.id}/removeJobsToCollections`);
        toast.success("Jobs Removed");
      } else {
        await axios.patch(`/api/jobs/${job.id}/saveJobsToCollections`);
        toast.success("Jobs saved");
      }
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
      console.log(`error : ${(error as Error)?.message}`);
    } finally {
      setisBookmarkLoading(false);
    }
  };

  const getExperienceLabel = (value: string) => {
    const experience = experienceData.find((exp) => exp.value === value);
    return experience ? experience.label : "NA";
  };

  const getHourlyrateLabel = (value: string) => {
    const hourlyratelabel = hourlyRate.find((hrl) => hrl.value === value);
    return hourlyratelabel ? hourlyratelabel.label : "NA";
  };
  return (
    <motion.div layout>
      <Card>
        <div className="w-full h-full p-4 flex flex-col items-start justify-start gap-y-4 ">
          {/* saved user */}
          <Box>
            <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(job.CreatedAt), { addSuffix: true })}</p>

            <Button variant={"ghost"} size={"icon"}>
              {isBookmarkLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <div onClick={onClickSaveJob}>
                  {" "}
                  <SavedUsersIcon className={cn("w-4 h-4 ", isSavedByUser ? "text-customGreen-500" : "text-muted-foreground")} />
                </div>
              )}
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
          </Box>
          <Box>
            {job.hourlyRate && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Currency className="w-3 h-3 mr-1" />
                {formatHourlyRateLabel(getHourlyrateLabel(job.hourlyRate))}
              </div>
            )}
          </Box>
          <Box>
            {job.yearsOfExperience && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Network className="w-3 h-3 mr-1" />
                {formatHourlyRateLabel(getExperienceLabel(job.yearsOfExperience))}
              </div>
            )}
          </Box>
          {job.short_description && (
            <CardDescription className="text-xs">
              {truncate(job.short_description, {
                length: 150,
                omission: "...",
              })}
            </CardDescription>
          )}

          {job.tags.length > 0 && (
            <Box classname="flex-wrap justify-start gap-1">
              {job.tags.slice(0, 6).map((tag, i) => (
                <p key={i} className="bg-gray-100 text-xs rounded-md px-2 py-[2px] font-semibold text-neutral-500">
                  {tag}
                </p>
              ))}
            </Box>
          )}

          <Box classname="gap-2 mt-auto">
            <Link href={`/search/${job.id}`} className="w-full">
              <Button className="w-full border-customGreen-500 text-customGreen-500 hover:bg-transparent hover:text-customGreen-600" variant={"outline"}>
                Details
              </Button>
            </Link>
            <Button className="w-full text-white hover:bg-customGreen-800 bg-customGreen-800/90 hover:text-white" variant={"outline"} onClick={onClickSaveJob}>
              {isSavedByUser ? "Saved" : "Save For Later"}
            </Button>
          </Box>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCardItem;
