"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Company, Job } from "@prisma/client";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface CompanyDetailContentPageProps {
  userId: string | null;
  company: Company;
  jobs: Job[];
}

const CompanyDetailContentPage = ({ userId, company, jobs }: CompanyDetailContentPageProps) => {
  const isFollower = userId && company?.followers?.includes(userId);
  const [isLoading, setisLoading] = useState(false);
  const onClickAddRemoveFollowers = async () => {};
  return (
    <div className="w-full rounded-2xl bg-white p-4 z-50 -mt-8">
      <div className="flex-col w-full px-4">
        {/* company details */}
        <div className="w-full flex items-center justify-between -mt-12">
          <div className="flex items-end justify-end space-x-4">
            {company?.logo && (
              <div className="aspect-square w-auto bg-white h-32 rounded-2xl border flex items-center justify-center relative overflow-hidden p-3">
                <Image width={120} height={120} alt={company?.name} src={company?.logo} className="object-contain" />
              </div>
            )}

            {/* name content etc... */}
            <div className="flex-col space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-sans font-bold text-neutral-700 capitalize">{company.name}</h2>
                <p className="text-muted-foreground text-sm">{`(${company?.followers?.length}) following`}</p>
              </div>

              <p className="text-sm text-muted-foreground">leveraging technology to provide better services</p>

              <div className="flex items-center gap-2 flex-wrap">
                <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">Management Constulting</p>
                <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">Management Constulting</p>
                <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">Management Constulting</p>
                <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">b2b</p>
              </div>
            </div>
          </div>

          <Button
            onClick={onClickAddRemoveFollowers}
            className={cn("w-24 rounded-full hover:shadow-md flex items-center justify-center border border-customGreen-500", !isFollower && "bg-customGreen-600 hover:bg-customGreen-700")}
            variant={isFollower ? "outline" : "default"}
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <React.Fragment>
                {isFollower ? (
                  "Unfollow"
                ) : (
                  <React.Fragment>
                    <Plus className="w-4 h-4 mr-2" />
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailContentPage;
