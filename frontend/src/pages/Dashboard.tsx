import { useState } from "react";
import { Button } from "../components/Button"
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { Plusicon } from "../icons/Plusicon";
import { Shareicon } from "../icons/Shareicon";
import { Sidebar } from "../components/Sidebar";


function Dashboard() {
  const [modelOpen , setModelOpen] = useState(true)
  return (
    <div >
      
<Sidebar/>
      
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModel open={modelOpen} onClose={() => {
        setModelOpen(false)
      }}/>
      <div className="flex justify-end gap-4">
        <Button onClick={() => {
          setModelOpen(true)
        }}
          variant="primary"
          text="Add Content"
          startIcon={<Plusicon />}
        ></Button>
        <Button
          variant="secondary"
          text="Share"
          startIcon={<Shareicon />}
        ></Button>
      </div>

        <Card />
        </div>
    </div>
  );
}

export default Dashboard