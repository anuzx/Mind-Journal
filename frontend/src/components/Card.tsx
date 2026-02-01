import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Deleteicon } from "../icons/Deleteicon";
import { Notebookicon } from "../icons/Notebookicon";
import { Shareicon } from "../icons/Shareicon";
import { DeletePosts , shareContent } from "../api/posts";
import Popup from "./Popup";
import { useState } from "react";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "links";
  description: string;
}

export function Card({ id, title, link, type, description }: CardProps) {

  const queryClient = useQueryClient();
  
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  //DELETE MUTATION
  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: DeletePosts,
    onSuccess: () => {
      // refetch posts after delete
      queryClient.invalidateQueries({ queryKey: ["content"] });
      setShowDeletePopup(false); //close popup after success
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to delete post");
    },
  });

  //SHARE MUTATION
  const { mutate: shareMutation} = useMutation({
    mutationFn: shareContent,
    onSuccess: () => {
      setShowSharePopup(false);
    },
    onError: () => {
      alert("Failed to share post");
    },
  });

  function handleDelete() {
    //event hanlers dont rander ui
   deleteMutation(id)
  }

  function handleShare() {
    shareMutation(link);
  }
  return (
    <div>
      <div
        className=" p-4 bg-white rounded-md shadow-md border-gray-100
          max-w-72 border min-h-48"
      >
        <div className="flex justify-between">
          <div className="flex items-center text-md ">
            <div className="text-gray-500 pr-2">
              <Notebookicon />
            </div>
            <div className="text-xl text-gray-950">{title}</div>
          </div>
          <div
            className="
            flex items-center "
          >
            <div className="pr-2 text-gray-500  hover:text-purple-600 cursor-pointer" onClick={() => setShowSharePopup(true)}>
              <Shareicon />
            </div>
            <div
              className={`pl-4 text-gray-500 cursor-pointer ${
                isPending ? "opacity-50 pointer-events-none" : ""
              } hover:text-purple-600`}
              onClick={() => setShowDeletePopup(true)}
            >
              <Deleteicon />
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="p-2 pb-4 text-gray-800">{description}</div>
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
      <Popup
        open={showDeletePopup}
        text="Are you sure you want to delete this post?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeletePopup(false)}
      />
      <Popup
        open={showSharePopup}
        text="Are you sure you want to share this post?"
        onConfirm={handleShare}
        onCancel={() => setShowSharePopup(false)}
      />
    </div>
  );
}
