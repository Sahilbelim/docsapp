import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card";

function Forground() {
  const [addButton, setAddButton] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    docs: "",
    filesize: "",
    close: false,
    tagisOpen: null,
    tagTitle: "",
    tagColor: "",
  });
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const ref = useRef();
  useEffect(() => {
    // const fetchData = async () => {
    //   const apiUrl = `http://localhost:8000/api/docs`;
    //   const responce = await axios({
    //     method: "get",
    //      url: apiUrl,
    //     headers: {
    //      "Content-Type": "application/json; charset=utf-8",
    //     },
    //   });
    //    console.log(response);
    //   console.log("data")
    // }
    const fetchData = () => {
      axios
        .get("http://localhost:8000/api/docs")
        .then((res) => {
          setData(res.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8000/api/docs";

    try {
      const data = new FormData();

      data.append("desc", form.docs);
      data.append("filesize", form.filesize);
      data.append("close", form.close ? true : false);
      data.append("tagisOpen", form.tagisOpen);
      data.append("tagTitle", form.tagTitle);
      data.append("tagColor", form.tagColor);

      console.log(data);
      const response = await axios({
        method: "post",
        url: apiUrl,
        data: data,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      console.log(response);
      setAddButton(!addButton);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const data = [
  //   {
  //   desc: "Lorem for Lore any kind of text that is not necessarily translated into something like  a Lore",
  //   filesize: ".9mb",
  //   close: true,
  //   tag:{ isOpen: true, tagTitle:"Download Now ", tagColor:"green"},
  //   },    {
  //   desc: "Lorem for Lore any kind of text that is not necessarily translated into something like  a Lore",
  //   filesize: ".9mb",
  //   close: true,
  //   tag:{ isOpen: false, tagTitle:"Download Now ", tagColor:"green"},
  //   },    {
  //   desc: "Lorem for Lore any kind of text that is not necessarily translated into something like  a Lore",
  //   filesize: ".9mb",
  //   close: true,
  //   tag:{ isOpen: true, tagTitle:"Download Now ", tagColor:"blue"},
  //   },    {
  //   desc: "Lorem for Lore any kind of text that is not necessarily translated into something like  a Lore",
  //   filesize: ".9mb",
  //   close: false,
  //   tag:{ isOpen: true, tagTitle:"Uplod Now ", tagColor:"green"},
  //   },
  // ]
  const formButton = () => {
    console.log(!addButton);
    setAddButton(!addButton);
  };
  return (
    <>
      <button
        className=" w-20 bg-red-400 z-[5] fixed text-red-900   rounded-b-md "
        onClick={formButton}
      >
        {" "}
        Add{" "}
      </button>
      <div
        ref={ref}
        className={`w-full h-screen z-[3] fixed top-0 left-0 flex gap-10 flex-wrap p-5 ${
          addButton ? "blur-lg" : ""
        }`}
      >
        {data.map((item, index) => (
          <>
            <Card data={item} reference={ref} key={index} />
          </>
        ))}
      </div>
      <div
        className={`${
          addButton ? "" : "hidden"
        }  w-full z-[4]  top-0 left-0 fixed flex justify-center items-center h-full `}
      >
        <form onSubmit={handleSubmit}>
          <div className="form  bg-zinc-900  p-10 rounded-lg ">
            <div>
              <input
                type="text"
                placeholder=" Enter Docs"
                className=" rounded-md p-2 m-2"
                name="docs"
                value={form.docs}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder=" Enter filesize"
                className=" rounded-md p-2 m-2"
                name="filesize"
                value={form.filesize}
                onChange={onChange}
                required
              />
            </div>

            <div className=" m-2 text-zinc-500 flex justify-center">
              Status of Download
            </div>
            <div className=" ms-2 flex justify-center">
              <input
                defaultChecked
                type="radio"
                id="true"
                name="close"
                value={true}
                onChange={onChange}
              />
              <label htmlFor="true" className=" m-2 text-zinc-500">
                True
              </label>

              <input
                type="radio"
                id="false"
                name="close"
                value={false}
                onChange={onChange}
              />
              <label htmlFor="false " className="m-2 text-zinc-500">
                False
              </label>
            </div>
            <div className=" m-2 text-zinc-500 flex justify-center">
              Status of Tag
            </div>
            <div className=" ms-2 flex justify-center">
              <input
                type="radio"
                id="true"
                name="tagisOpen"
                value={true}
                onChange={onChange}
              />
              <label htmlFor="true" className=" m-2 text-zinc-500">
                True
              </label>

              <input
                type="radio"
                id="false"
                name="tagisOpen"
                value={false}
                onChange={onChange}
              />
              <label htmlFor="false " className="m-2 text-zinc-500">
                False
              </label>
            </div>
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className=" text-green-900  hover:text-green-300 bg-green-500 px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Add Docs
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Forground;
