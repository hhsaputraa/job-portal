import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Job } from "@prisma/client";

type GetJobs = {
  title?: string;
  categoryId?: string;
  sortOrder?: string;
  shiftTiming?: string;
  workMode?: string;
  yearsOfExperience?: string;
  savedJobs?: boolean;
  page?: number;
  limit?: number;
};

type PaginatedJobsResult = {
  jobs: Job[];
  totalJobs: number;
  totalPages: number;
};

export const GetJobs = async ({ title, categoryId, sortOrder, shiftTiming, workMode, yearsOfExperience, savedJobs, page = 1, limit = 4 }: GetJobs): Promise<PaginatedJobsResult> => {
  const { userId } = auth();

  try {
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
        CreatedAt: "desc", // Default to newest first
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

    // Handle sorting order
    if (sortOrder) {
      switch (sortOrder) {
        case "newest":
          query.orderBy = { CreatedAt: "desc" };
          break;
        case "oldest":
          query.orderBy = { CreatedAt: "asc" };
          break;
        default:
          // Keep default sorting (newest first)
          break;
      }
    }

    //filter the data based on the shift timing
    let formattedShiftTiming = shiftTiming?.split(",");

    if (formattedShiftTiming && formattedShiftTiming.length > 0) {
      query.where.shiftTiming = {
        in: formattedShiftTiming,
      };
    }

    let formmatedWorkingMode = workMode?.split(",");

    if (formmatedWorkingMode && formmatedWorkingMode.length > 0) {
      query.where.workMode = {
        in: formmatedWorkingMode,
      };
    }

    let formmatedYOExperience = yearsOfExperience?.split(",");

    if (formmatedYOExperience && formmatedYOExperience.length > 0) {
      query.where.yearsOfExperience = {
        in: formmatedYOExperience,
      };
    }

    if (savedJobs) {
      query.where.savedUsed = {
        has: userId,
      };
    }

    // Add pagination
    const skip = (page - 1) * limit;
    query.skip = skip;
    query.take = limit;

    // Execute the query to fetch the paginated jobs
    const jobs = await db.job.findMany(query);

    // Get total count of jobs (without pagination)
    const totalJobs = await db.job.count({ where: query.where });

    // Calculate total pages
    const totalPages = Math.ceil(totalJobs / limit);

    return {
      jobs,
      totalJobs,
      totalPages,
    };
  } catch (error) {
    console.log("[GET_JOBS]:", error);
    return {
      jobs: [],
      totalJobs: 0,
      totalPages: 0,
    };
  }
};
