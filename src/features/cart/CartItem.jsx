import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getPizzaExistsInCart } from "./cartSlice.js";
import DeleteItem from "./DeleteItem";
import UpdateItem from "../menu/UpdateItem.jsx";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const pizzaExistsCart = useSelector((state) =>
    getPizzaExistsInCart(state, pizzaId)
  );

  return (
    <li className="py-3">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-8">
          <UpdateItem pizzaId={pizzaId} currQuantity={pizzaExistsCart} />
          <DeleteItem onClick={() => dispatch(deleteItem(pizzaId))} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
