"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, Form, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  // ganti text munculkan jika judul kerjaan tidak diisi
  title: z.string().min(1, { message: "job Title cannot be empty" }),
});

const JobCreatePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/jobs", values);
      router.push(`/admin/jobs/${response.data.id}`);
      toast.success("Pekerjaan Baru Dibuat");
    } catch (error) {
      console.log((error as Error)?.message);
      //toast notif
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Form Tambah Loker</h1>
        <p className="text-sm text-neutral-500">masukan nama pekerjaan</p>
        {/* form */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            {/* form field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pekerjaan</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="Contoh : Barista" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={"/admin/jobs"}>
                <Button type="button" variant={"ghost"}>
                  Batal
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Tambah
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default JobCreatePage;
