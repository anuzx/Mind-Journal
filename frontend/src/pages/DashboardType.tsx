import { useParams } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { Card } from "../components/Card";

export default function DashboardType() {
  const { type } = useParams(); // youtube | twitter | document | links
  const { data = [], isLoading } = useContent();

  if (isLoading) return <div>Loading...</div>;

  const filtered = data.filter((post) => post.type === type);

  return (
    <div className="flex gap-4 flex-wrap">
      {filtered.map((post) => (
        <Card key={post._id} {...post} id={post._id} />
      ))}
    </div>
  );
}
