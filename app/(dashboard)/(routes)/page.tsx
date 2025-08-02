import { GetJobs } from "@/actions/get-job";
import Box from "@/components/box";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import HomeSearchContainer from "../_components/home-search-containers";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import Link from "next/link";
import type { Job } from "@prisma/client";

const DashboardHomePage = async () => {
  const { userId } = auth();
  const jobsResult = await GetJobs({});

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const companies = await db.company.findMany({
    orderBy: {
      CreatedAt: "desc",
    },
    take: 5, // Limit to 5 companies
  });

  const testimonials = [
    {
      name: "Andi Setiawan",
      feedback: "Platform ini sangat membantu saya menemukan pekerjaan impian saya!",
    },
    {
      name: "Siti Nurhaliza",
      feedback: "Saya sangat puas dengan pengalaman mencari pekerjaan di sini.",
    },
    {
      name: "Budi Santoso",
      feedback: "Proses pencarian pekerjaan menjadi lebih mudah dan cepat.",
    },
  ];

  // Use the jobs array from the jobsResult
  const featuredJobs = jobsResult.jobs.slice(0, 3);

  const jobSearchTips = ["Perbarui CV Anda secara berkala", "Sesuaikan lamaran dengan deskripsi pekerjaan", "Persiapkan diri untuk wawancara dengan baik", "Bangun jaringan profesional Anda", "Tetap positif dan gigih dalam pencarian"];

  return (
    <div className="flex-col py-6 px-4 space-y-24">
      <Box classname="flex-col justify-center w-full space-y-4 mt-12">
        <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-wide text-neutral-600">Jelajahi Pekerjaan Impianmu</h2>
        <p className="text-2xl text-muted-foreground">Cari pekerjaanmu</p>
      </Box>

      <HomeSearchContainer />

      <Box classname="mt-12">
        <h3 className="text-xl font-bold mb-4">Kategori Pekerjaan</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-100 p-4 rounded-lg text-center">
              <Briefcase className="mx-auto mb-2" />
              <p className="text-lg text-neutral-600">{category.name}</p>
            </div>
          ))}
        </div>
      </Box>

      <Box classname="mt-12">
        <h3 className="text-xl font-bold mb-4">Perusahaan Terbaru</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {companies.map((company) => (
            <div key={company.id} className="bg-white p-4 rounded-lg shadow-md text-center">
              <Image src={company.logo || "/placeholder-logo.png"} alt={company.name} width={64} height={64} className="mx-auto mb-2 rounded-full" />
              <p className="text-lg text-neutral-600">{company.name}</p>
            </div>
          ))}
        </div>
      </Box>

      {/* <Box classname="mt-12">
        <h3 className="text-xl font-bold mb-4">Pekerjaan Unggulan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job: Job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">{job.title}</h4>
              <p className="text-muted-foreground mb-4">{job.company?.name}</p>
              <p className="text-sm mb-4">{job.description.slice(0, 100)}...</p>
              <Link href={`/jobs/${job.id}`}>
                <Button variant="outline">
                  Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Box> */}

      <Box classname="mt-12">
        <h3 className="text-xl font-bold mb-4">Tips Mencari Pekerjaan</h3>
        <ul className="list-disc pl-5 space-y-2">
          {jobSearchTips.map((tip, index) => (
            <li key={index} className="text-lg text-neutral-600">
              {tip}
            </li>
          ))}
        </ul>
      </Box>

      <Box classname="mt-12">
        <h3 className="text-xl font-bold mb-4">Testimonial Pengguna</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold mb-2">{testimonial.name}</p>
              <p className="text-muted-foreground">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </Box>

      <Box classname="mt-12 bg-primary text-primary-foreground p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Anda Pengusaha?</h3>
        <p className="text-lg mb-6">Temukan talenta terbaik untuk perusahaan Anda. Pasang lowongan pekerjaan sekarang!</p>
        <Link href="/post-job">
          <Button variant="secondary" size="lg">
            Pasang Lowongan <Users className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </Box>

      <Box classname="relative overflow-hidden h-64 justify-center rounded-lg mt-12">
        <Image alt="Home Banner" src="/img/jobssukabumi-high-resolution-logo-transparent.png" layout="fill" objectFit="contain" className="rounded-lg" />
      </Box>
    </div>
  );
};

export default DashboardHomePage;
