import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleClick(e){
    e.preventDefault();
    if(!query) return;
    navigate(`/order/${query}`);
    setQuery("")
  }
  return (
    <div>
      <form onSubmit={handleClick} className="">
        <input className="border-none rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 focus:ring focus:ring-yellow-200 focus:ring-offset- focus:outline-none w-40 sm:focus:w-64 transition-all duration-300 focus:ring-opacity-50" placeholder="Search Your Order #" type="text" value={query} onChange={(e)=>setQuery(e.target.value)}/>
      </form>
    </div>
  );
}

export default SearchOrder;
