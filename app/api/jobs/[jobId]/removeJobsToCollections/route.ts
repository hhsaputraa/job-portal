import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: { params: { jobId: string } }) => {
  try {
    const { userId } = auth();
    const { jobId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!jobId) {
      return new NextResponse("Id is Missing", { status: 404 });
    }

    const job = await db.job.findUnique({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      return new NextResponse("Job Not Found", { status: 404 });
    }

    // update the job

    const userIndex = job.savedUsed.indexOf(userId);
    let updatedJobs;
    if (userIndex !== -1) {
      updatedJobs = await db.job.update({
        where: {
          id: jobId,
          userId,
        },
        data: {
          savedUsed: {
            set: job.savedUsed.filter((savedUserId) => savedUserId !== userId),
          },
        },
      });
    }

    return NextResponse.json(updatedJobs);
  } catch (error) {
    console.log(`[JOB_PUBLISH_PATCH] : ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
};
