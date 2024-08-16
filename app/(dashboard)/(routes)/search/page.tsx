import SearchContainer from "@/components/search-container";

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
  return (
    <>
      <div className="px-6 pt-6 block W">
        <SearchContainer />
      </div>
    </>
  );
};

export default SearchPage;
