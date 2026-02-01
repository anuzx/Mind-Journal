import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { ContentType, postContent } from "../api/posts";
import { Crossicon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  

  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  const queryClient = useQueryClient();

    const { mutate: createContent} = useMutation({
      mutationFn: postContent,
      onSuccess: () => {
        //tell TanStack cache: content is outdated
        queryClient.invalidateQueries({ queryKey: ["content"] });
        onClose();
      },
    });

  function addContent() {
    createContent({
      title: titleRef.current?.value || "",
      link: linkRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      type,
    });
  }

  if (!open) return null;
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>

          <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded ">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer pb-4">
                    <Crossicon />
                  </div>
                </div>
                <div>
                  <Input reference={titleRef} placeholder={"Title"} />

                  <Input reference={linkRef} placeholder={"Link"} />

                  <Input reference={descriptionRef} placeholder={"Description"} />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex gap-1 p-4">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    />

                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    text="Submit"
                    onClick={addContent}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
