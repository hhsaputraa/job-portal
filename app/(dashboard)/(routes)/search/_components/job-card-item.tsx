"use client";

import { Job } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Box from "@/components/box";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Loader2 } from "lucide-react";

interface JobCardItemProps {
  job: Job;
  userId: string | null;
}

const JobCardItem = ({ job, userId }: JobCardItemProps) => {
  const [isBookmarkLoading, setisBookmarkLoading] = useState(false);
  const SavedUsersIcon = BookmarkCheck;

  return (
    <motion.div layout>
      <Card>
        <div className="w-full h-full p-4 flex flex-col items-start justify-start gap-y-4 ">
          <Box>
            <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(job.CreatedAt), { addSuffix: true })}</p>

            <Button variant={"ghost"} size={"icon"}>
              {isBookmarkLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SavedUsersIcon />}
            </Button>
          </Box>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCardItem;
