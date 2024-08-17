import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return <ul className="divide-y divide-stone-400 max-w-2xl mx-auto">
    {menu.map(pizza => <MenuItem key={pizza.id} pizza={pizza}/>)}
  </ul>
}

export async function loader(){
  const menu = await getMenu();
  return menu;
}

export default Menu;
