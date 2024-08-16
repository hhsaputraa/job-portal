"use client";

interface JobPublishActionProps {
  disable: boolean;
  jobId: string;
  isPublished: boolean;
}

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const JobPublishAction = ({ disable, jobId, isPublished }: JobPublishActionProps) => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setisLoading(true);
      if (isPublished) {
        //unpublish the job
        await axios.patch(`/api/jobs/${jobId}/unpublish`);
        toast.success("job Un-Published");
      } else {
        await axios.patch(`/api/jobs/${jobId}/publish`);
        toast.success("job Published");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went Wrong");
      console.log((error as Error)?.message);
    } finally {
      setisLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setisLoading(true);
      await axios.delete(`/api/jobs/${jobId}`);
      toast.success("job Deleted");
      router.refresh();
      return router.push("/admin/jobs");
    } catch (error) {
      toast.error("Something went Wrong");
      console.log((error as Error)?.message);
    } finally {
      setisLoading(false);
    }
  };
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
