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

const dataAtServer = [...Array(100)].map(() => ({
    word: faker.random.word(),
    id: faker.datatype.uuid(),
}));
console.log("all data", dataAtServer);

const getAllDatafromServer = (page, length) => {
    const skip = (page - 1) * length;
    return {
        data: dataAtServer.slice(skip + 1, skip + length),
        totalPages: Math.ceil(dataAtServer.length / length),
    };
};

const searchfromServer = (page, length, query) => {
    const skip = (page - 1) * length;
    const filtered = dataAtServer.filter(({ word }) =>
        word.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered, "filtered", query);
    return {
        data: filtered.slice(skip + 1, skip + length),
        totalPages: Math.ceil(dataAtServer.length / length),
    };
};

export default function App() {
    const [data, setData] = useState();
    const [currPage, setCurrPage] = useState(1);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query !== "") {
            setData(() => searchfromServer(currPage, 10, query));
        } else {
            setData(() => getAllDatafromServer(currPage, 10));
        }
    }, [currPage, query]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-4">
            <header className="flex gap-4">
                <input
                    className="outline"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                />
                <button
                    type="button"
                    onClick={() => {
                        setCurrPage(1);
                    }}
                >
                    Submit
                </button>
            </header>
            <div>Data</div>
            <div className="flex flex-col gap-4 [&>*]:outline">
                {data?.data?.map((d, i) => (
                    <div key={d.id}>{d.word}</div>
                ))}
            </div>
            <Pagination
                {...{
                    currPage: currPage,
                    setCurrPage,
                    totalPages: data?.totalPages,
                }}
            />
        </div>
    );
}
