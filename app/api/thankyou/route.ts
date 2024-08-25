import { compileThankYouEmailTemplate, sendMail } from "@/lib/mail";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, fullName } = await req.json();

  const response = await sendMail({
    to: email,
    name: fullName,
    subject: "thankyou for apply",
    body: compileThankYouEmailTemplate(fullName),
  });

  if (response?.messageId) {
    return NextResponse.json("mail delivered", { status: 200 });
  } else {
    return new NextResponse("mail not send", { status: 401 });
  }
};
