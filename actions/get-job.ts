import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Job } from "@prisma/client";

type GetJobs = {
  title?: string;
  categoryId?: string;
  shiftTiming?: string;
  workMode?: string;
  yearsOfExperience?: string;
  savedJobs?: boolean;
};

export const GetJobs = async ({ title, categoryId, shiftTiming, workMode, yearsOfExperience, savedJobs }: GetJobs): Promise<Job[]> => {
  const { userId } = auth();

  try {
    //initialize the query object with common options

    let query: any = {
      where: {
        isPublished: true,
      },
      include: {
        company: true,
        category: true,
        attachments: true,
      },
      orderBy: {
        CreatedAt: "desc",
      },
    };

    if (typeof title !== "undefined" || typeof categoryId !== "undefined") {
      query.where = {
        AND: [
          typeof title !== "undefined" && {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          typeof categoryId !== "undefined" && {
            categoryId: {
              equals: categoryId,
            },
          },
        ].filter(Boolean),
      };
    }

    //execute the query to fetch the job based on the constructed parameter
    const jobs = await db.job.findMany(query);
    return jobs;
  } catch (error) {
    console.log("[GET_JOBS]:", error);
    return [];
  }
};
