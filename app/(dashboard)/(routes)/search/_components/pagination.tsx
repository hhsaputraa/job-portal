import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: any;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, searchParams }) => {
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)} className="px-4 py-2 border rounded">
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={createPageURL(page)} className={`px-4 py-2 border rounded ${currentPage === page ? "bg-customGreen-500 text-white" : ""}`}>
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)} className="px-4 py-2 border rounded">
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
