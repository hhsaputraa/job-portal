export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Plus, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { columns, CompanyColums } from "./_components/columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";

const AccessDenied = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
    <h1 className="text-2xl font-bold mb-2">Akses Ditolak</h1>
    <p className="text-gray-600 mb-4">Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.</p>
    <Link href="/">
      <Button variant="secondary">Kembali ke Beranda</Button>
    </Link>
  </div>
);

const CompaniesOverviewPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Check if the user is an admin
  const user = await currentUser();
  if (user?.publicMetadata?.role !== "admin") {
    return <AccessDenied />;
  }

  const companies = await db.company.findMany({
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
            Tambah Perusahaan
          </Button>
        </Link>
      </div>

      {/* Datatable - list of companies */}
      <div className="mt-6">
        <DataTable columns={columns} data={formattedCompanies} searchKey="name" />
      </div>
    </div>
  );
};

export default CompaniesOverviewPage;
