import React from "react";

function Loader() {
  return (
    <div className="absolute top-50 bg-slate-200/20 backdrop-blur-sm flex align-middle justify-center items-center inset-0 ">
      <div className="loader z-10" />
    </div>
  );
}

export default Loader;
