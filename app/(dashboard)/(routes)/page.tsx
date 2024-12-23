import { GetJobs } from "@/actions/get-job";
import Box from "@/components/box";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import HomeSearchContainer from "../_components/home-search-containers";
import Image from "next/image";

const DashboardHomePage = async () => {
  const { userId } = auth();
  const jobs = await GetJobs({});

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const companies = await db.company.findMany({
    orderBy: {
      CreatedAt: "desc",
    },
  });
  return (
    <div className="flex-col py-6 px-4 space-y-24">
      <Box classname="flex-col justify-center w-full space-y-4 mt-12">
        <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-wide text-neutral-600">Jelajahi Pekerjaan Impianmu</h2>

        <p className="text-2xl text-muted-foreground">cari pekerjaanmu</p>
      </Box>

      <HomeSearchContainer />

      {/* <Box classname="relative overflow-hidden h-64 justify-center rounded-lg mt-12">
        <Image alt="Home Banner" src={"/img/jobssukabumi-high-resolution-logo-transparent.png"} width={250} height={250} className="object-cover rounded-lg" />
      </Box> */}
    </div>
  );
};

export default DashboardHomePage;
