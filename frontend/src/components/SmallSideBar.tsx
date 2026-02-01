import { List } from "lucide-react";

function SmallSideBar({ onToggle }: { onToggle: () => void }) {
  
  return (
    <>
      <div className="h-screen bg-white w-20 fixed left-0 top-0 pl-6">
        <List
          className="my-2 rounded hover:bg-gray-200 hover:text-purple-600"
          onClick={onToggle}
        />
        <div className="flex text-2xl pt-4 items-center">
          <div className="pr-2 text-purple-600"></div>
        </div>
      </div>
    </>
  );
}
export default SmallSideBar