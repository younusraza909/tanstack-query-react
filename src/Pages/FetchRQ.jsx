import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
