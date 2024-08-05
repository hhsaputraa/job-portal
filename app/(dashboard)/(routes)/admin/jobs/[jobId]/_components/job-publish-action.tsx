"use client";

interface JobPublishActionProps {
  disable: boolean;
  jobId: string;
  isPublished: boolean;
}

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { useState } from "react";

const JobPublishAction = ({ disable, jobId, isPublished }: JobPublishActionProps) => {
  const [isLoading, setisLoading] = useState(false);

  const onClick = () => {};
  const onDelete = () => {};
  return (
    <div className="flex items-center gap-x-3">
      <Button variant={"outline"} onClick={onClick} disabled={disable || isLoading} size={"sm"}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button variant={"destructive"} size={"icon"} disabled={isLoading} onClick={onDelete}>
        <Trash className=" w-4 h-4" />
      </Button>
    </div>
  );
};

export default JobPublishAction;
