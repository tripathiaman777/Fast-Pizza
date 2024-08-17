import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, getPizzaExistsInCart } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItem from "./UpdateItem";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  // const cartButton = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  const pizzaExistsCart = useSelector((state) =>
    getPizzaExistsInCart(state, id)
  );

  return (
    <li className="flex m-4 gap-4 pt-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-sm border border-black ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-end justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}
          <div className="flex gap-2">
            {pizzaExistsCart && (
              <DeleteItem onClick={() => dispatch(deleteItem(id))}></DeleteItem>
            )}
            {!soldOut && !pizzaExistsCart && (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            )}
            {pizzaExistsCart && (
              <UpdateItem pizzaId={id} currQuantity={pizzaExistsCart} />
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
