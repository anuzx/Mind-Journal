import { Deleteicon } from "../icons/Deleteicon";
import { Notebookicon } from "../icons/Notebookicon";
import { Shareicon } from "../icons/Shareicon";

interface CardProps{
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document"| "links"
    
}



export function Card({title , link ,type}:CardProps) {
  return (
    <div>
      <div
        className=" p-4 bg-white rounded-md shadow-md border-gray-100
          max-w-72 border"
      >
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className= "text-gray-500 pr-2">
              <Notebookicon />
            </div>
            projects
          </div>
          <div
            className="
            flex items-center"
          >
            <div className="pr-2 text-gray-500">
              <Shareicon />
            </div>
            <div className="pr-2 text-gray-500">
              <Deleteicon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
