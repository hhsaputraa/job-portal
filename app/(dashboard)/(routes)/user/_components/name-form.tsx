"use client";

import Box from "@/components/box";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "@prisma/client";
import axios from "axios";
import { Pencil, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface NameFormProps {
  initialData: UserProfile | null;
  userId: string;
}

const formSchema = z.object({
  fullName: z.string().min(1, { message: "fullName is required" }),
});

const NameForm = ({ initialData, userId }: NameFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/users/${userId}`, values);
      toast.success("Profile update");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something when wrong");
    }
  };

  const toggleEditing = () => setisEditing((current) => !current);
  return (
    <Box>
      {!isEditing && (
        <div className={cn("text-lg mt-2 flex items-center gap-2", initialData?.fullName && "text-black")}>
          <UserCircle className="w-4 h-4 mr-2" />
          {initialData?.fullName ? initialData.fullName : " No Full Name"}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 flex-1">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="isi nama anda" {...field} />
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

      <Button onClick={toggleEditing} variant={"ghost"}>
        {isEditing ? (
          <>cancel</>
        ) : (
          <>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </>
        )}
      </Button>
    </Box>
  );
};

export default NameForm;