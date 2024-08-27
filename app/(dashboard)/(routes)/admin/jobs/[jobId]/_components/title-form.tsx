"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  jobId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const TitleForm = ({ initialData, jobId }: TitleFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Berhasil Diperbarui");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Terjadi Kesalahan");
    }
  };

  const toggleEditing = () => setisEditing((current) => !current);
  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      {" "}
      <div className="font-medium flex items-center justify-between">
        Nama Pekerjaan
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isEditing ? (
            <>Batal</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Nama
            </>
          )}
        </Button>
      </div>
      {/*  display the title if not editing*/}
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {/* on editing mode display the input */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="contoh : Social Media Spesialis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-4">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
