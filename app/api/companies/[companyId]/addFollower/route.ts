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

    // Cek apakah user sudah follow
    if (company.followers && company.followers.includes(userId)) {
      return new NextResponse("Already following", { status: 400 });
    }

    // Fix: update logic untuk MongoDB array
    const updatedCompany = await db.company.update({
      where: {
        id: companyId,
      },
      data: {
        followers: {
          push: userId, // MongoDB push syntax
        },
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.log(`[COMPANY_PATCH] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
