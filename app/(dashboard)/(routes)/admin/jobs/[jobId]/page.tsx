import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Building2, File, LayoutDashboard, ListCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import JobPublishAction from "./_components/job-publish-action";
import Banner from "@/components/Banner";
import IconBadge from "@/components/icon-badge";
import TitleForm from "./_components/title-form";
import CategoryForm from "./_components/category-form";
import ImageForm from "./_components/image-form";
import ShortDescription from "./_components/short-description";
import ShiftTimingForm from "./_components/shift-timing-model";
import GajiForm from "./_components/gaji-form";
import WorkModeForm from "./_components/work-mode-form";
import WorkExperienceForm from "./_components/work-experience";
import JobDescription from "./_components/job-description";
import TagsForm from "./_components/tags-form";
import CompanyForm from "./_components/company-form";
import AttachmentsForm from "./_components/attachments-form";

const JobDetailPage = async ({ params }: { params: { jobId: string } }) => {
  const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!validObjectIdRegex.test(params.jobId)) {
    return redirect("/admin/jobs");
  }

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          CreatedAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  if (!job) {
    return redirect("/admin/jobs");
  }
  const requiredFields = [job.title, job.description, job.imageUrl, job.categoryId];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <div className="p-6">
      <Link href={"/admin/jobs"}>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <ArrowLeft className="w-4 h-4" />
          kembali
        </div>
      </Link>
      {/* BAGIAN ATAS FORM PEKERJAAN */}
      <div className="flex items-center justify-between my-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Data Lowongan Pekerjaan</h1>
          <span className="text-sm text-neutral-500">(*) Wajib Diisi sebelum pekerjaan dibagikan {completionText}</span>
        </div>
        {/* action button */}
        <JobPublishAction jobId={params.jobId} isPublished={job.isPublished} disable={!isComplete} />
      </div>

      {/* Warning before publishing */}

      {!job.isPublished && <Banner variant={"warning"} label="Loker Belum dibagikan" />}

      {/* container layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* left container */}
        <div>
          {/* NAMA PEKERJAAN */}
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl text-neutral-700">Isi Form</h2>
          </div>

          {/* NAMA */}
          <TitleForm initialData={job} jobId={job.id} />

          {/* KATEGORI */}

          <CategoryForm
            initialData={job}
            jobId={job.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />

          {/* GAMBAR SAMPUL */}

          <ImageForm initialData={job} jobId={job.id} />

          {/* DESKRIPSI SINGKAT */}
          <ShortDescription initialData={job} jobId={job.id} />

          {/* Jenis Loker */}
          <ShiftTimingForm initialData={job} jobId={job.id} />

          {/* gaji form */}
          <GajiForm initialData={job} jobId={job.id} />

          {/* Tipe Pekerjaan form */}
          <WorkModeForm initialData={job} jobId={job.id} />

          {/* pengalaman kerja form */}
          <WorkExperienceForm initialData={job} jobId={job.id} />
        </div>

        {/* Bagian Kanan */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListCheck} />
              <h2 className="text-xl text-neutral-700">Persyaratan Pekerjaan</h2>
            </div>

            <TagsForm initialData={job} jobId={job.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Building2} />
              <h2 className="text-xl text-neutral-700">Rincian Perusahaan</h2>
            </div>

            {/* Rincian Perusahaan */}
            <CompanyForm
              initialData={job}
              jobId={job.id}
              options={companies.map((company) => ({
                label: company.name,
                value: company.id,
              }))}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl text-neutral-700">Lampiran pekerjaan</h2>
          </div>
          {/* Lampiran pekerjaan */}
          <div className="col-span-2">
            <AttachmentsForm initialData={job} jobId={job.id} />
          </div>
        </div>

        {/* description */}
        <div className="col-span-2">
          <JobDescription initialData={job} jobId={job.id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
