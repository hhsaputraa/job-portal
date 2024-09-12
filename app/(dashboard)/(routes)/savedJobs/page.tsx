import { GetJobs } from "@/actions/get-job";
import Box from "@/components/box";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import SearchContainer from "@/components/search-container";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PageContent from "../search/_components/page-content";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
    createdAtFilter: string;
    shiftTiming: string;
    workMode: string;
    yearsOfExperience: string;
  };
}

const SaveJobsPage = async ({ searchParams }: SearchProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const jobs = await GetJobs({ ...searchParams, savedJobs: true });
  return (
    <div className="flex-col">
      <Box classname="mt-4 items-center justify-start gap-2 mb-4 px-2">
        <CustomBreadCrumb breadCrumbPage="savedJobs" />
      </Box>

      <Box classname="w-full h-44 bg-customGreen-600/20 justify-center">
        <h2 className="fonst-sans uppercase text-3xl tracking-wider font-bold">Disimpan </h2>
      </Box>

      <div className="px-6 pt-6 md:mb-0">
        <SearchContainer />
      </div>

      <div className="p-4">
        <PageContent jobs={jobs.jobs} userId={userId} />
      </div>
    </div>
  );
};

export default SaveJobsPage;
