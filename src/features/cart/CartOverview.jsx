import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPizzas = useSelector(getTotalCartQuantity)
  const totalPrice = useSelector(getTotalCartPrice)
  const getURL = useLocation().pathname;
  
  if(!totalPizzas) return null;
  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      
      {getURL != '/cart' && <Link to='/cart'>Open cart &rarr;</Link>}
    </div>
  );
}

export default CartOverview;
