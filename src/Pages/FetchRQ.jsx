import { NavLink } from "react-router-dom";
import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // refetchInterval:1000, // For Polling
    // refetchIntervalInBackground: true, // Polling in background as well else it will not poll when we are out of scope
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
