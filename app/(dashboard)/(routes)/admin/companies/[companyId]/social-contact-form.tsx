"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import axios from "axios";
import { Globe, Linkedin, Mail, MapPin, Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CompanySocialContactFormProps {
  initialData: Company;
  companyId: string;
}

const formSchema = z.object({
  mail: z.string().min(1, { message: "Mail is required" }),
  website: z.string().min(1, { message: "Website is required" }),
  linkedin: z.string().min(1, { message: "linkedin is required" }),
  addres_line_1: z.string().min(1, { message: "Addres line 1 is required" }),
  addres_line_2: z.string().min(1, { message: "Addres line 2 is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
});

const CompanySocialContactForm = ({ initialData, companyId }: CompanySocialContactFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mail: initialData?.mail || "",
      website: initialData?.website || "",
      linkedin: initialData?.linkedin || "",
      addres_line_1: initialData?.addres_line_1 || "",
      addres_line_2: initialData?.addres_line_2 || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zipcode: initialData?.zipcode || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/companies/${companyId}`, values);
      toast.success("company update");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something when wrong");
    }
  };

  const toggleEditing = () => setisEditing((current) => !current);
  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      {" "}
      <div className="font-medium flex items-center justify-between">
        company social contact
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              edit name
            </>
          )}
        </Button>
      </div>
      {/*  display the name if not editing*/}
      {!isEditing && (
        <>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 ">
              {initialData.mail && (
                <div className="text-sm text-neutral-500 flex items-center w-full truncate">
                  <Mail className="w-3 h-3 mr-2" />
                  {initialData.mail}
                </div>
              )}
              {initialData.linkedin && (
                <Link href={initialData.linkedin} className="text-sm text-neutral-500 flex items-center w-full truncate">
                  <Linkedin className="w-3 h-3 mr-2" />
                  {initialData.linkedin}
                </Link>
              )}
              {initialData.website && (
                <Link href={initialData.website} className="text-sm text-neutral-500 flex items-center w-full truncate">
                  <Globe className="w-3 h-3 mr-2" />
                  {initialData.website}
                </Link>
              )}
            </div>
            <div className="col-span-3">
              {initialData.addres_line_1 && (
                <div className="flex items-start gap-2 justify-start">
                  <MapPin className="w-3 h-3 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {initialData.addres_line_1}, {initialData.addres_line_2},
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {initialData.city}, {initialData.state}-{initialData.zipcode}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {/* on editing mode display the input */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder=" Mail sample : 'hr@bongkarturret.com'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder=" Website Link : https://companyname.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder=" linkedin Link : https://linkedin/@namelinkedin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addres_line_1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder=" Alamat pertama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addres_line_2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder=" Alamat kedua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={isSubmitting} placeholder="Nama Kota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={isSubmitting} placeholder="Bagian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={isSubmitting} placeholder="Kode Pos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

export default CompanySocialContactForm;