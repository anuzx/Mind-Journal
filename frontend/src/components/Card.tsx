import { Deleteicon } from "../icons/Deleteicon";
import { Notebookicon } from "../icons/Notebookicon";
import { Shareicon } from "../icons/Shareicon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "links";
  description: string;
}

export function Card({ title, link, type ,description}: CardProps) {
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
            <div className="pr-2 text-gray-500">
              <Shareicon />
            </div>
            <div className=" pl-4 text-gray-500">
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
    </div>
  );
}
