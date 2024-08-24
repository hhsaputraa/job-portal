"use client";

import Box from "@/components/box";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { Attachment, Company, Job, Resumes, UserProfile } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface JobDetailPageContentProps {
  job: Job & { company: Company | null; attachments: Attachment[] };
  jobId: string;
  userProfile: (UserProfile & { resumes: Resumes[] }) | null;
}

const JobDetailPageContent = ({ job, jobId, userProfile }: JobDetailPageContentProps) => {
  return (
    <>
      <Box classname="mt-4">
        <CustomBreadCrumb breadCrumbItem={[{ label: "Search", link: "/search" }]} breadCrumbPage={job?.title !== undefined ? job.title : ""} />
      </Box>

      {/* Job Cover Image */}
      <Box classname="mt-4">
        <div className="w-full flex items-center h-72 relative rounded-md overflow-hiddenr">
          {job?.imageUrl ? (
            <Image alt={job.title} fill className="object-cover w-full h-full" src={job?.imageUrl} />
          ) : (
            <div className=" w-full h-full bg-customGreen-100 flex items-center justify-center">
              <h2 className="text-3xl font-semibold tracking-wider">{job?.title}</h2>
            </div>
          )}
        </div>
      </Box>

      {/* Title And Action Button */}
      <Box classname="mt-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-neutral-600">{job?.title}</h2>
          <Link href={`/companies/${job.companyId}`}>
            <div className="flex items-center gap-2 mt-1">
              {job?.company?.logo && <Image alt={job?.company?.name} width={25} height={25} src={job?.company?.logo} />}
              <p className="text-muted-foreground text-sm font-semibold">{job?.company?.name}</p>
            </div>
          </Link>
        </div>

        {/* action Button */}
        <div>
          {userProfile ? (
            <>
              {!userProfile.appliedJobs.some((appliedJobs) => appliedJobs.jobId === jobId) ? (
                <Button className="text-sm bg-customGreen-700 hover:bg-customGreen-900">Apply</Button>
              ) : (
                <Button className="text-sm text-customGreen-700 hover:bg-customGreen-900 hover:text-white hover:shadow-sm" variant={"outline"}>
                  Already Applied
                </Button>
              )}
            </>
          ) : (
            <Link href={"/user"}>
              <Button className="text-sm px-8 bg-customGreen-700 hover:bg-customGreen-900 hover:shadow-sm">Update Profile</Button>
            </Link>
          )}
        </div>
      </Box>
    </>
  );
};

export default JobDetailPageContent;
