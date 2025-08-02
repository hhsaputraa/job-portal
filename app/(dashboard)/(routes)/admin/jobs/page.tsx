export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { columns, JobsColumns } from "./_components/columns";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { format } from "date-fns";

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

const JobsPageOverview = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Check if the user is an admin
  const user = await currentUser();
  if (user?.publicMetadata?.role !== "admin") {
    return <AccessDenied />;
  }

  const jobs = await db.job.findMany({
    include: {
      category: true,
      company: true,
    },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  const formattedJobs: JobsColumns[] = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company ? job.company.name : "",
    category: job.category ? job.category.name : "N/A",
    isPublished: job.isPublished,
    createdAt: job.CreatedAt ? format(new Date(job.CreatedAt), "MMMM do, yyyy") : "N/A",
  }));

  return (
    <div className="p-6">
      <div className="flex items-end justify-end">
        <Link href={"/admin/create"}>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Tambah Loker
          </Button>
        </Link>
      </div>

      {/* Datatable - list of job */}
      <div className="mt-6">
        <DataTable columns={columns} data={formattedJobs} searchKey="title" />
      </div>
    </div>
  );
};

export default JobsPageOverview;
