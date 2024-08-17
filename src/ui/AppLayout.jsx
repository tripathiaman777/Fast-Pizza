import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
function AppLayout() {
  const navigation = useNavigation();
  const username = useSelector((state => state.user.username))
  // console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className=" max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
