import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { columns, CompanyColums } from "./_components/columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";

const CompaniesOverviewPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  const formattedCompanies: CompanyColums[] = companies.map((company) => ({
    id: company.id,
    name: company.name ? company.name : "",
    logo: company.logo ? company.logo : "",
    createdAt: company.CreatedAt ? format(new Date(company.CreatedAt), "MMMM do, yyyy") : "N/A",
  }));

  return (
    <div className="p-6">
      <div className="flex items-end justify-end">
        <Link href={"/admin/companies/create"}>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Company
          </Button>
        </Link>
      </div>

      {/* Datatable - list of job */}
      <div className="mt-6">
        <DataTable columns={columns} data={formattedCompanies} searchKey="name" />
      </div>
    </div>
  );
};

export default CompaniesOverviewPage;
