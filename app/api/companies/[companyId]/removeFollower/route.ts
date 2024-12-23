import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: { params: { companyId: string } }) => {
  try {
    const { userId } = auth();
    const { companyId } = params;

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!companyId) {
      return new NextResponse("Id is missing", { status: 401 });
    }

    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!companyId) {
      return new NextResponse("Company Not Found", { status: 401 });
    }

    //remove user id from the followers

    const userIndex = company?.followers.indexOf(userId);

    if (userIndex !== -1) {
      const updatedCompany = await db.company.update({
        where: {
          id: companyId,
        },
        data: {
          followers: {
            set: company?.followers.filter((followerId) => followerId !== userId),
          },
        },
      });

      return new NextResponse(JSON.stringify(updatedCompany), { status: 200 });
    } else {
      return new NextResponse("user not found in followers", { status: 404 });
    }
  } catch (error) {
    console.log(`[COMPANY_PATCH] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
