import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Job } from "@prisma/client";

type GetJobs = {
  title?: string;
  categoryId?: string;
  createdAtFilter: string;
  shiftTiming?: string;
  workMode?: string;
  yearsOfExperience?: string;
  savedJobs?: boolean;
};

export const GetJobs = async ({ title, categoryId, createdAtFilter, shiftTiming, workMode, yearsOfExperience, savedJobs }: GetJobs): Promise<Job[]> => {
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

    // check whether the createAtFillter is Provide or Not

    if (createdAtFilter) {
      const currentDate = new Date();
      let startDate: Date;
      switch (createdAtFilter) {
        case "today":
          startDate = new Date(currentDate);
          break;

        case "yesterday":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 1);
          break;

        // case "thisweek":
        //   startDate = new Date(currentDate);
        //   startDate.setDate(startDate.getDate() - currentDate.getDay());
        //   break;
        case "lastweek":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - currentDate.getDay() - 7);
          break;

        case "thismonth":
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          break;

        default:
          startDate = new Date(0);
      }
      query.where.CreatedAt = {
        gte: startDate,
      };
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

    //execute the query to fetch the job based on the constructed parameter
    const jobs = await db.job.findMany(query);
    return jobs;
  } catch (error) {
    console.log("[GET_JOBS]:", error);
    return [];
  }
};
