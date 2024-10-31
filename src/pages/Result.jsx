import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import Watcard from "../components/Watcard";
import { GetWatCard } from "../services/search";

const Result = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const date = new URLSearchParams(location.search).get("date");
  const startDate = new URLSearchParams(location.search).get("startDate");
  const endDate = new URLSearchParams(location.search).get("endDate");
  const [watData, setWatData] = useState([]);

  useEffect(() => {
    async function getwat(query, startDate, endDate) {
      const result = await GetWatCard(query, startDate, endDate);
      setWatData(result);
      console.log(watData);
    }

    getwat(query, startDate, endDate);
  }, []);

  useEffect(() => {
    async function getwat(query, startDate, endDate) {
      const result = await GetWatCard(query, startDate, endDate);
      setWatData(result);
      console.log(watData);
    }

    getwat(query, startDate, endDate);
  }, [query, startDate, endDate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="w-full md:w-[90%] lg:w-3/4 mx-auto px-4 md:px-6 my-10 md:my-20 relative">
      <div className="relative z-50">
        <Searchbar onSearch={(query) => {}} initialQuery={query} initialDate={date} />
      </div>

      <p className="font-bold text-[#AD957B] text-2xl sm:text-3xl md:text-4xl mb-4 mt-8">ผลลัพธ์การค้นหาวัด</p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                          gap-4 md:gap-6 relative z-0"
      >
        {watData ? (
          watData.map((wat) => (
            <Watcard
              key={wat.id}
              id={wat.id}
              image={wat.picture[0].url}
              title={wat.name}
              minprice={wat.min_cost}
              maxprice={wat.max_cost}
              location={wat.location}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">ไม่พบผลลัพธ์การค้นหา</div>
        )}
      </div>

      {watData && watData.length === 0 && <div className="text-center text-gray-400 py-10">ไม่พบผลลัพธ์การค้นหา</div>}
    </div>
  );
};

export default Result;
