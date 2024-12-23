import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export const metadata: Metadata = {
  title: "JobsSukabumi | Loker Terkini untuk Warga Sukabumi",
  description: "online job portal application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <body className={poppins.className}> */}
        <body>
          {children}
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
