import { useState, useEffect } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username, status, address, position, error: locationAddress } = useSelector(
    (state) => state.user
  );
  console.log(username);
  
  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  var cartPrice = useSelector(getTotalCartPrice);
  const isLoading = status === "loading";
  console.log(status);
  
  if (withPriority) {
    cartPrice += cartPrice / 5;
  }
  // if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <button onClick={()=>dispatch(fetchAddress())}>Get Position</button> */}

      <Form method="POST">
        <div className="mb-5  flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input"
            defaultValue={username}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 p-2 rounded-2xl bg-red-100">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5  flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div>
            <input
              className="input"
              disabled={isLoading}
              defaultValue={address}
              type="text"
              name="address"
              required
            />
          </div>
          <span className="absolute right-[5px] z-50">
            <Button
              type="primary"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Position
            </Button>
          </span>
        </div>
        

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-offset-0 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Order..."
              : `Order now from ${formatCurrency(cartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority == "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log(newOrder);
  
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
