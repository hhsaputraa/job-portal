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

interface ShiftTimingFormProps {
  initialData: Job;
  jobId: string;
}

let options = [
  {
    value: "penuh-waktu",
    label: "Penuh Waktu",
  },
  {
    value: "contract",
    label: "Kontrak",
  },
  {
    value: "paruh-waktu",
    label: "Part Time",
  },
  {
    value: "magang",
    label: "Magang",
  },
];

const formSchema = z.object({
  shiftTiming: z.string().min(1),
});

const ShiftTimingForm = ({ initialData, jobId }: ShiftTimingFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shiftTiming: initialData?.shiftTiming || "",
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

  const seletedOption = options.find((option) => option.value === initialData.shiftTiming);
  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      {" "}
      <div className="font-medium flex items-center justify-between">
        Jenis Loker
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
      {/*  display the shiftTiming if not editing*/}
      {!isEditing && <p className={cn("text-sm mt-2", !initialData?.shiftTiming && "text-neutral-500 italic")}>{seletedOption?.label || "tidak ditemukan"}</p>}
      {/* on editing mode display the input */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="shiftTiming"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox options={options} heading="Jenis Loker" {...field} />
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

export default ShiftTimingForm;
