export const dynamic = "force-dynamic";
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

    if (!company) {
      return new NextResponse("Company Not Found", { status: 404 });
    }

    // Cek apakah user ada di followers
    if (!company.followers || !company.followers.includes(userId)) {
      return new NextResponse("Not following this company", { status: 400 });
    }

    // Update untuk remove user dari followers
    const updatedCompany = await db.company.update({
      where: {
        id: companyId,
      },
      data: {
        followers: {
          set: company.followers.filter((followerId) => followerId !== userId),
        },
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.log(`[COMPANY_PATCH] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
