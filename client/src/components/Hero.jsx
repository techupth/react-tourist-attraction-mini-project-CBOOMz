import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
function Hero() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    searchFromServer(searchText);
  }, [searchText]);

  const searchFromServer = async (text) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/trips?keywords=${text}`
      );
      setSearchResult(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="text-1xl font-bold text-start mt-8  text-gray-600  ml-36">
        ค้นหาที่เที่ยว
      </div>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน.."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-4/5 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-500 mb-8 text-center "
        />
      </div>
      {searchResult.map((item, index) => (
        <div
          key={index}
          id="blogpost"
          className="flex mx-auto  border-gray-700 justify-around p-4 mb-8 mx rounded-lg shadow-md hover:shadow-lg relative"
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center"></div>

          <img
            src={item.photos[0]}
            id="picture"
            className=" h-52 object-cover rounded-xl mb-4 hover:opacity-80 w-68"
            alt={item.title}
          />

          <div id="blogpost-info" className="flex flex-col  ">
            <div>
              <h3
                id="title"
                className="text-2xl font-semibold mb-2 text-gray-600 "
              >
                {item.title}
              </h3>
              <p id="description" className="text-gray-400 mb-4">
                {item.description.slice(0, 150)}...
              </p>
              <a
                href={item.url}
                className="text-blue-300 hover:underline text-decoration-line: underline"
              >
                อ่านต่อ
              </a>
            </div>
            <div id="category-container" className="flex justify-start mt-4">
              <span className="text-gray-400 hover:underline">หมวดหมู่:</span>
              {item.tags.map((tag, index) => (
                <div
                  key={index}
                  tag={tag}
                  className=" text-sm text-gray-400 rounded-md flex items-center justify-center ml-2 text-decoration-line: underline"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex justify-items-start mt-4">
              {item.photos.slice(1, 4).map((photo, index) => (
                <img
                  key={index}
                  className="w-16 h-16 object-cover rounded-md mb-2 mr-2 hover:opacity-80 "
                  src={photo}
                  alt={`Photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Hero;
