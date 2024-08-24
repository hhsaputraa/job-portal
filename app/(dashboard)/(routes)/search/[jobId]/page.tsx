import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import JobDetailPageContent from "./_components/job-details-job-contens";

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
  return (
    <div className="flex-col p-4 md:p-8">
      <JobDetailPageContent job={job} jobId={job.id} userProfile={profile} />
    </div>
  );
};

export default JobDetailPage;
