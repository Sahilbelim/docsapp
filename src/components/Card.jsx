// import React from 'react'
import { LuDownload } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import axios from "axios";
function Card({ data, reference }) {


const Delete = async (id) => {
  // console.log("Delete", id);
  const apiUrl = `https://docsapi-hets.onrender.com/api/docs/${id}`;
  try {
    const response = await axios({
      method: "delete",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
   
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      <motion.div
        drag
        dragConstraints={reference}
        whileDrag={{ scale: 1.2 }}
        dragElastic={0.2}
        className=" relative flex-shrink-0 w-60 h-72 rounded-[40px] bg-zinc-900/90 text-zinc-50 px-8 py-10 overflow-hidden"
      >
        <FaRegFileAlt />
        <p className=" text-sm font-semibold mt-5 leading-tight ">
          {data.desc}
        </p>
        <div className="footer absolute bottom-0  w-full  left-0">
          <div className="flex items-center justify-between  px-8 py-3 mb-3 ">
            <h5>{data.filesize}</h5>
            <span className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center ">
              {data.close ? (
                <IoClose
                  onClick={() => {
                    Delete(data._id);
                  }}
                />
              ) : (
                <LuDownload size={"0.7em"} color="#fff" />
              )}
            </span>
          </div>
          {data.tagisOpen ? (
            <div
              className={`tag w-full py-4 ${
                data.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"
              }  flex items-center justify-center `}
            >
              <h3 className="tetx-sm font-semibold ">{data.tagTitle} </h3>
            </div>
          ) : null}
        </div>
      </motion.div>
    </>
  );
}

export default Card
