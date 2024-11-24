import { useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../API/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData, // when next data is fetched it wil show previous data instead of loading
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

      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <h2>{pageNumber / 3 + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};
