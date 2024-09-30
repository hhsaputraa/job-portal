"use client";

import Editor from "@/components/editor";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job } from "@prisma/client";
import axios from "axios";
import { Copy, Lightbulb, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface JobDescriptionProps {
  initialData: Job;
  jobId: string;
}

const formSchema = z.object({
  description: z.string().min(1),
});

const JobDescription = ({ initialData, jobId }: JobDescriptionProps) => {
  const [isEditing, setisEditing] = useState(false);

  const [isPrompting, setisPrompting] = useState(false);
  const router = useRouter();
  const [roleName, setRollName] = useState("");
  const [aiValue, setaiValue] = useState("");
  const [skills, setSkills] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Berhasil Update");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Terjadi Kesalahan");
    }
  };

  const toggleEditing = () => setisEditing((current) => !current);

  const handlePromptGeneration = async () => {
    try {
      setisPrompting(true);
      const customPrompt = `Bisakah Anda membuat dokumen persyaratan pekerjaan untuk posisi ${roleName}? Deskripsi pekerjaan harus mencakup peran & tanggung jawab, fitur utama, dan rincian tentang peran tersebut. Keterampilan yang diperlukan harus mencakup keahlian dalam ${skills}. Selain itu, Anda dapat mencantumkan keterampilan opsional yang terkait dengan pekerjaan tersebut. Terima kasih.`;

      await getGenerativeAIResponse(customPrompt).then((data) => {
        data = data.replace(/^'|'$/g, "");
        let cleanedText = data.replace(/[\*\#]/g, "");
        // form.setValue("description", cleanedText);
        setaiValue(cleanedText);
        setisPrompting(false);
      });
    } catch (error) {
      console.log(error);
      toast.error("Terjadi Kesalahan");
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(aiValue);
    toast.success("disalin ke Klipbboard");
  };

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      {" "}
      <div className="font-medium flex items-center justify-between">
        Deskripsi Lengkap *
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
      {!isEditing && <div className={cn("text-sm mt-2", !initialData.description && "text-neutral-500 italic")}>{initialData.description ? <Preview value={initialData.description} /> : "Deskripsi belum diisi"}</div>}
      {/*  display the description if not editing*/}
      {/* on editing mode display the input */}
      {isEditing && (
        <>
          <div className="flex items-center gap-2 my-2">
            <input type="text" placeholder="contoh : Teknisi" value={roleName} onChange={(e) => setRollName(e.target.value)} className="w-full p-2 rounded-md" />

            <input type="text" placeholder="Skill Yang dibutuhkan" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-2 rounded-md" />
            {isPrompting ? (
              <>
                <Button>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handlePromptGeneration}>
                  <Lightbulb className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-right">Catatan: Nama profesi & Keahlian yang dibutuhkan dibatasi dengan koma</p>

          {aiValue && (
            <div className="w-full h-96 max-h-96 rounded-md bg-white overflow-y-scroll p-3 relative mt-4 text-muted-foreground">
              {aiValue}
              <Button className="absolute top-3 right-3 z-10" variant={"outline"} size={"icon"} onClick={onCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
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
        </>
      )}
    </div>
  );
};

export default JobDescription;
