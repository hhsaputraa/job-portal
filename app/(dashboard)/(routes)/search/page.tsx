export const dynamic = "force-dynamic";
import { GetJobs } from "@/actions/get-job";
import SearchContainer from "@/components/search-container";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import CategoriesList from "./_components/categories-list";
import PageContent from "./_components/page-content";
import AppliedFilters from "./_components/applied-filters";
import Pagination from "./_components/pagination";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
    createdAtFilter: string;
    shiftTiming: string;
    workMode: string;
    yearsOfExperience: string;
    page: string;
  };
}

const SearchPage = async ({ searchParams }: SearchProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const { userId } = auth();
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 10;

  const { jobs, totalJobs, totalPages } = await GetJobs({
    ...searchParams,
    page,
    limit,
  });

  console.log(`Jobs Count: ${jobs.length}, Total Jobs: ${totalJobs}, Total Pages: ${totalPages}`);

  return (
    <>
      <div className="px-6 pt-6 block md:hidden md:mb-0">
        <SearchContainer />
      </div>

      <div className="p-6">
        {/* categories */}
        <CategoriesList categories={categories} />

        {/* applied filter */}
        <AppliedFilters categories={categories} />

        {/* page content */}
        <PageContent jobs={jobs} userId={userId} />

        {/* pagination */}
        <Pagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />
      </div>
    </>
  );
};

export default SearchPage;
