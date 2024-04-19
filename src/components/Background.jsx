// import React from 'react'

function Background() {
  return (
    <>
      <div className="w-full h-screen fixed z-[2]">
        <div className="w-full py-10 flex justify-center text-zinc-600 text-xl absolute top-[5%] font-semibold ">
          Document
        </div>
        <h1 className="text-[13vw] text-zinc-900 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] leading-none tracking-tighter absolute ">
          Docs.
        </h1>
      </div>
    </>
  );
}

export default Background
