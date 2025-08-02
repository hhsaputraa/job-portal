export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import JobDetailPageContent from "./_components/job-details-job-contens";
import { Separator } from "@/components/ui/separator";
import { GetJobs } from "@/actions/get-job";
import Box from "@/components/box";
import PageContent from "../_components/page-content";

const JobDetailPage = async ({ params }: { params: { jobId: string } }) => {
  const { userId } = auth();

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },
    include: {
      company: true,
      attachments: true,
    },
  });

  if (!job) {
    redirect("/search");
  }

  const profile = await db.userProfile.findUnique({
    where: {
      userId: userId as string,
    },
    include: {
      resumes: {
        orderBy: {
          CreatedAt: "desc",
        },
      },
    },
  });

  //   const jobs = await GetJobs({})

  //   const filterredJobs = jobs.filter((j) => j.id !== job?.id && job.categoryId === job?.categoryId);
  return (
    <div className="flex-col p-4 md:p-8">
      <JobDetailPageContent job={job} jobId={job.id} userProfile={profile} />

      {/* {filterredJobs && filterredJobs.length > 0 && (
        <>
          <Separator />
          <Box classname="flex-col my-4 items-start justify-start px-4 gap-2">
            <h2 className="text-lg font-semibold">Related Jobs</h2>
            <p className="font-sans">{job?.short_description}</p>
          </Box>

          <PageContent jobs={filterredJobs} userId={userId} />
        </>
      )} */}
    </div>
  );
};

export default JobDetailPage;
