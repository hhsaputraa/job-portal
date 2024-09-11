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
      },
    });

    if (!job) {
      return new NextResponse("Job Not Found", { status: 404 });
    }

    // Check if the user has saved this job
    if (!job.savedUsed || !job.savedUsed.includes(userId)) {
      return new NextResponse("Job not saved by this user", { status: 400 });
    }

    // Update the job to remove the user from savedUsed
    const updatedJob = await db.job.update({
      where: {
        id: jobId,
      },
      data: {
        savedUsed: {
          set: job.savedUsed.filter((savedUserId) => savedUserId !== userId),
        },
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.log(`[JOB_UNSAVE_PATCH] : ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
