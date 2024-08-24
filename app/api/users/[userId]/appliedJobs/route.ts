import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const { userId } = auth();

    const jobId = await req.text();

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("Job ID is Missing", { status: 401 });
    }

    let profile = await db.userProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      return new NextResponse("User Profile Not Found", { status: 401 });
    }

    const updateProfile = await db.userProfile.update({
      where: {
        userId,
      },
      data: {
        appliedJobs: {
          push: { jobId },
        },
      },
    });

    return NextResponse.json(updateProfile);
  } catch (error) {
    console.log(`[JOB_APPLIED_JOBS_PATCH] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
