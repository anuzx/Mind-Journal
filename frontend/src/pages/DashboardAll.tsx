import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";

function DashboardAll() {
 

  const { data: contents = [],
    isLoading,
    isError,
     } = useContent();

  if (isLoading) {
    return <div className="ml-72 p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="ml-72 p-4">Something went wrong</div>;
  }
  return (
        <div className="flex gap-4 flex-wrap ">
          {contents.map((post) => (
            <Card
              key={post._id}
              id={post._id}
              type={post.type}
              link={post.link}
              title={post.title}
              description={post.description}
            />
          ))}
        </div>
  );
}

export default DashboardAll;
