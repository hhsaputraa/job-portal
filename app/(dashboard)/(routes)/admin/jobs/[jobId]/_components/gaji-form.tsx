"use client";

import { Button } from "@/components/ui/button";
import ComboBox from "@/components/ui/combo-box";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface GajiFormProps {
  initialData: Job;
  jobId: string;
}

let options = [
  {
    value: "1-3_jt",
    label: "1 - 3 juta",
  },
  {
    value: "3-6_jt",
    label: "3 - 6 juta",
  },
  {
    value: "6jt_plus",
    label: "lebih dari 6 juta",
  },
  {
    value: "secret",
    label: "Diinformasikan setelah proses rekrutmen",
  },
  {
    value: "secompetitive",
    label: "Gaji Kompetitif",
  },
];

const formSchema = z.object({
  hourlyRate: z.string().min(1),
});

const GajiForm = ({ initialData, jobId }: GajiFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hourlyRate: initialData?.hourlyRate || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("job update");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something when wrong");
    }
  };

  const toggleEditing = () => setisEditing((current) => !current);

  const seletedOption = options.find((option) => option.value === initialData.hourlyRate);
  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      {" "}
      <div className="font-medium flex items-center justify-between">
        Gaji
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isEditing ? (
            <>Batal</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              edit
            </>
          )}
        </Button>
      </div>
      {/*  display the hourlyRate if not editing*/}
      {!isEditing && <p className={cn("text-sm mt-2", !initialData?.hourlyRate && "text-neutral-500 italic")}>{seletedOption?.label || "gaji belum ditentukan"}</p>}
      {/* on editing mode display the input */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox options={options} heading="Perkiraan Gaji" {...field} />
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

export default GajiForm;
