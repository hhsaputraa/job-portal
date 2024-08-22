"use client";

import AttachmentsUploads from "@/components/attachment-upload";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attachment, Job, Resumes, UserProfile } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface ResumeFormProps {
  initialData: (UserProfile & { resumes: Resumes[] }) | null;
  userId: string;
}

const formSchema = z.object({
  attachments: z
    .object({
      url: z.string(),
      name: z.string(),
    })
    .array(),
});

const ResumeForm = ({ initialData, userId }: ResumeFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const [deletingId, setdeletingId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>();

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(`/api/jobs/${userId}/attachments`, values);
      toast.success("job attachments update");
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.log((error as Error)?.message);
      toast.error("Something when wrong");
    }
  };

  const toggleEditing = () => setisEditing((current) => !current);
  const onDelete = async (resume: Resumes) => {
    try {
      setdeletingId(resume.id);
      // Make the delete request to the server
      await axios.delete(`/api/jobs/${userId}/attachments/${resume.id}`);
      toast.success("Attachment Removed");
      router.refresh();
    } catch (error) {
      console.log((error as Error)?.message);
      toast.error("Something went wrong");
    } finally {
      setdeletingId(null);
      router.refresh(); // Optionally refresh to ensure data consistency
    }
  };

  return (
    <div className="mt-6 border flex-1 w-full rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Your CV/Resume
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              add a file
            </>
          )}
        </Button>
      </div>
      {/*  display the attachments if not editing*/}
      {!isEditing && (
        <div className="space-y-2">
          {initialData?.resumes.map((item) => (
            <div key={item.url} className="flex items-center p-3 w-full bg-customGreen-100 border-customGreen-200 border text-customGreen-700 rounded-md">
              <File className="w-4 h-4 mr-2 " />
              <p className="text-xs w-full truncate">{item.name}</p>
              {deletingId === item.id && (
                <Button variant={"ghost"} size={"icon"} className="p-1" type="button">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              )}

              {deletingId !== item.id && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="p-1"
                  onClick={() => {
                    onDelete(item);
                  }}
                  type="button"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* on editing mode display the input */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AttachmentsUploads
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(attachments) => {
                        if (attachments) {
                          onSubmit({ attachments });
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-4">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ResumeForm;
