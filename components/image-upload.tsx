"use client";

import { storage } from "@/config/firebase.config";
import { ref, uploadBytesResumable } from "firebase/storage";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}
const ImageUpload = ({ disabled, onChange, onRemove, value }: ImageUploadProps) => {
  const [isMounted, setisMounted] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [progress, setproses] = useState<number>(0);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file: File = e.target.files[0];
    setisLoading(true);
    const uploadTask = uploadBytesResumable(ref(storage, `JobCoverImages/${Date.now()}-${file?.name}`), file, { contentType: file?.type });
  };
  return (
    <div>
      {value ? (
        <>
          <div className="w-full h-60 aspect-video relative rounded-md flex items-center justify-center overflow-hidden">
            <Image fill className="w-full h-full object-cover" alt="image cover" src={value} />
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-60 aspect-video relative rounded-md flex items-center justify-center overflow-hidden border border-dashed bg-neutral-50">
            {isLoading ? (
              <>
                <p>{`${progress.toFixed(2)}%`}</p>
              </>
            ) : (
              <>
                <label>
                  <div className="w-full h-full flex flex-col gap-2 items-center justify-center cursor-pointer text-neutral-500 ">
                    <ImagePlus className="w-10 h-10 " />
                    <p>Upload an Image</p>
                  </div>
                  <input type="file" accept="image/*" className="w-0 h-0" onChange={onUpload} />
                </label>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
