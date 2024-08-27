import Box from "@/components/box";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import NameForm from "./_components/name-form";
import { db } from "@/lib/db";
import EmailForm from "./_components/email-form";
import ContactForm from "./_components/contact-form";
import ResumeForm from "./_components/resume-form";
import { DataTable } from "@/components/ui/data-table";
import { AppliedJobsColums, columns } from "./_components/column";
import { format } from "date-fns";

const ProfilePage = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  let profile = await db.userProfile.findUnique({
    where: {
      userId,
    },
    include: {
      resumes: {
        orderBy: {
          CreatedAt: "desc",
        },
      },
    },
  });

  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    include: {
      company: true,
      category: true,
    },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  const filteredAppliedJobs =
    profile && profile?.appliedJobs.length > 0
      ? jobs
          .filter((job) => profile.appliedJobs.some((appliedJob) => appliedJob.jobId === job.id))
          .map((job) => ({
            ...job,
            appliedAt: profile.appliedJobs.find((appliedJob) => appliedJob.jobId === job.id)?.appliedAt,
          }))
      : [];

  const formattedJobs: AppliedJobsColums[] = filteredAppliedJobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company ? job.company.name : "",
    category: job.category ? job.category?.name : "",
    appliedAt: job.appliedAt ? format(new Date(job.appliedAt), "MMMM do, yyyy") : "",
  }));

  return (
    <div className="flex-col p-4 md:p-8 items-center justify-center flex">
      <Box>
        <CustomBreadCrumb breadCrumbPage="My Profile" />
      </Box>

      <Box classname="flex-col p-4 rounded-md border mt-8 w-full space-y-6">
        {user && user.hasImage && (
          <div className="aspect-square w-24 h-24 rounded-full shadow-md relative">
            <Image fill className="w-full h-full object-cover" alt="User Profil Pic" src={user.imageUrl} />
          </div>
        )}

        <NameForm initialData={profile} userId={userId} />
        <EmailForm initialData={profile} userId={userId} />
        <ContactForm initialData={profile} userId={userId} />
        <ResumeForm initialData={profile} userId={userId} />
      </Box>

      {/* applied jobs list table */}

      <Box classname="flex-col items-start justify-start mt-12 ">
        <h2 className="text-2xl text-muted-foreground font-semibold">Applied Job</h2>
      </Box>

      <div className="w-full mt-6">
        <DataTable columns={columns} searchKey="company" data={formattedJobs} />
      </div>
    </div>
  );
};

export default ProfilePage;
