import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

function Hero() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");

  // ใช้ดึงข้อมูลบจาก server ทุกครั้งที่ searchText เปลี่ยน
  // ถาม dfมิว เรื่องการใช้ logic ใน useeffect และ มี map.length เข้ามาด้วย
  useEffect(() => {
    searchFromServer(searchText);
  }, [searchText]);

  // ใช้ดึงข้อมูลบจาก server ในครั้งแรก

  // request ข้อมูลจาก server  (text) เป็นการฝังค่าเพื่อใช้หาข้อมูลใน server
  const searchFromServer = async (text) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${text}`
      );
      setSearchResult(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-3xl ">ค้นหาที่เที่ยว</div>

      <input
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน"
        // fn. เพื่อ set state
        onChange={(e) => setSearchText(e.target.value)}
      />
      <>
        {searchResult.map((item, index) => (
          <div
            key={index}
            id="blogpost"
            className=" flex mx-auto bg-red-300 border-zinc-50  justify-around "
          >
            <img src={item.photos[0]} id="picture" className=" w-40   h-72" />
            <div id="blogpost-info">
              <h3 id="title" className=" text-2xl">
                {item.title}
              </h3>
              <p id="description" className=" text-slate-200">
                {item.description.slice(0, 100)}
              </p>
              <a href={item.url}>อ่านต่อ</a>
              <div id="category-container" className="flex  justify-around">
                <span className=" text-cyan-300">หมวดหมู่</span>
                {item.tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      tag={tag}
                      className=" w-20 h-16 text-s  caret-indigo-400"
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
              <div className="flex  justify-around">
                <img className=" w-16 h-16" src={item.photos[1]} />
                <img className=" w-16 h-16" src={item.photos[2]} />
                <img className=" w-16 h-16" src={item.photos[3]} />
              </div>
            </div>
          </div>
        ))}
      </>
    </>
  );
}

export default Hero;
