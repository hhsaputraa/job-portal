import { GetJobs } from "@/actions/get-job";
import SearchContainer from "@/components/search-container";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import CategoriesList from "./_components/categories-list";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
    shiftTiming: string;
    workMode: string;
    yearsOfExperience: string;
  };
}

const SearchPage = async ({ searchParams }: SearchProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const { userId } = auth();
  const jobs = await GetJobs({ ...searchParams });

  console.log(jobs, categories);
  return (
    <>
      <div className="px-6 pt-6 block md:hidden md:mb-0">
        <SearchContainer />
      </div>

      <div className="p-6">
        {/* categories */}
        <CategoriesList categories={categories} />

        {/* applied fillter */}

        {/* page content */}
      </div>
    </>
  );
};

export default SearchPage;
