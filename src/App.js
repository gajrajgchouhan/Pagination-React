import { useEffect, useState } from "react";
import "./styles.css";
import { faker } from "@faker-js/faker";

const Pagination = ({ currPage, setCurrPage, totalPages }) => {
  return (
    <div className="flex [&>*]:outline gap-4">
      <button
        className="disabled:opacity-40"
        disabled={currPage === 1}
        onClick={() => setCurrPage((curr) => curr - 1)}
      >
        Prev
      </button>
      <div>You are at page {currPage}</div>
      <button
        className="disabled:opacity-40"
        disabled={currPage === totalPages}
        onClick={() => setCurrPage((curr) => curr + 1)}
      >
        Next
      </button>
    </div>
  );
};

const dataAtServer = [...Array(100)].map(() => faker.random.words(3));

const getAllDatafromServer = (page, length) => {
  const skip = (page - 1) * length;
  return {
    data: dataAtServer.slice(skip + 1, skip + length),
    totalPages: Math.ceil(dataAtServer.length / length)
  };
};

const searchfromServer = (page, length, query) => {
  const skip = (page - 1) * length;
  return {
    data: dataAtServer
      .filter((d) => d.contains(query))
      .slice(skip + 1, skip + length),
    totalPages: Math.ceil(dataAtServer.length / length)
  };
};

export default function App() {
  const [data, setData] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query !== "") {
      // setData(() => {})
    } else {
      setData(getAllDatafromServer(currPage, 10));
    }
  }, [currPage]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-4">
      <header className="flex gap-4">
        <input
          className="outline"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
        <button type="button" onClick={() => {}}>
          Submit
        </button>
      </header>
      <div>Data</div>
      <div className="flex flex-col gap-4 [&>*]:outline">
        {data?.data?.map((d) => (
          <div>{d}</div>
        ))}
      </div>
      <Pagination
        {...{ currPage, setCurrPage, totalPages: data?.totalPages }}
      />
    </div>
  );
}
