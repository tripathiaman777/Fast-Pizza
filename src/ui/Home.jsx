import { useEffect, useState } from "react";
import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";
function Home() {
  // const [ipAddress, setIpAddress] = useState('');
  // const fetchIP = async () =>{
  //   try{
  //     const response = await fetch('https://api.ipify.org');
  //     const data = await response.text();
  //     setIpAddress(data);
  //   }
  //   catch(error){
  //     console.log(`Failed to fetch IP:`,error);
      
  //   }
  // }
  // useEffect(()=>{
  //   fetchIP();
  // },[])
  const username = useSelector((state)=>state.user.username);
  return (
    <div className="my-10 text-center px-4 sm:my-16">
      <h1 className="text-xl text-yellow-500 font-semibold text-center mb-8 md:text-3xl">
        The best pizza. 
        {/* {ipAddress} */}
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? <Button to='/menu' type='primary'>Continue ordering, {username}</Button>:<CreateUser />}
    </div>
  );
}

export default Home;
