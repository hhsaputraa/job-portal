"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job } from "@prisma/client";
import axios from "axios";
import { Lightbulb, Loader2, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TagsFormProps {
  initialData: Job;
  jobId: string;
}

const formSchema = z.object({
  tags: z.array(z.string()).min(1),
});

const TagsForm = ({ initialData, jobId }: TagsFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isPrompting, setisPrompting] = useState(false);
  const [jobTags, setjobTags] = useState<string[]>(initialData.tags);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Berhasil Diupdate");
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
      const customPrompt = `Hasilkan array yang berisi 10 kata kunci terkait dengan profesi "${prompt}". Kata kunci ini harus mencakup berbagai aspek dari profesi tersebut, termasuk keterampilan, tanggung jawab, alat, dan teknologi yang umumnya terkait. Usahakan untuk menghasilkan kumpulan kata kunci yang beragam yang secara akurat mewakili luasnya profesi tersebut. Hasilkan hanya dalam bentuk daftar/array kata kunci. Kembalikan hanya array tersebut..`;
      await getGenerativeAIResponse(customPrompt).then((data) => {
        // check data is array or not

        if (Array.isArray(JSON.parse(data))) {
          setjobTags((prevTags) => [...prevTags, ...JSON.parse(data)]);
        }
        setisPrompting(false);
      });
    } catch (error) {
      console.log(error);
      toast.error("Terjadi Kesalahan");
    }
  };

  const handleTagRemove = (index: number) => {
    const updateTags = [...jobTags];
    updateTags.splice(index, 1);
    setjobTags(updateTags);
  };

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      {" "}
      <div className="font-medium flex items-center justify-between">
        TAG
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
      {/*  display the tags if not editing*/}
      {!isEditing && (
        <div className="flex items-center flex-wrap gap-2">
          {initialData.tags.length > 0 ? (
            initialData.tags.map((tag, index) => (
              <div className="text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-customGreen-100" key={index}>
                {tag}
              </div>
            ))
          ) : (
            <p>Tidak Ada Tag</p>
          )}
        </div>
      )}
      {/* on editing mode display the input */}
      {isEditing && (
        <>
          <div className="flex items-center gap-2 my-2">
            <input type="text" placeholder="Contoh : Bartender" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-2 rounded-md" />
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
          <p className="text-xs text-muted-foreground text-right">cukup ketik nama profesi saja untuk membuat tag</p>

          <div className="flex items-center gap-2 flex-wrap">
            {jobTags.length > 0 ? (
              jobTags.map((tags, index) => (
                <div key={index} className="text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-customGreen-100">
                  {tags}
                  {""}{" "}
                  {isEditing && (
                    <Button variant={"ghost"} className="p-0 h-auto" onClick={() => handleTagRemove(index)}>
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p>Tidak Ada Tag</p>
            )}
          </div>
          <div className="flex items-center gap-2 justify-end mt-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setjobTags([]);
                onSubmit({ tags: [] });
              }}
              disabled={isSubmitting}
            >
              Hapus Semua
            </Button>
            <Button type="submit" disabled={isSubmitting} onClick={() => onSubmit({ tags: jobTags })}>
              Simpan
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TagsForm;
