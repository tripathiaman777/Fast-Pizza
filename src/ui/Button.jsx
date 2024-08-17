import React from "react";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "text-sm bg-yellow-400 uppercase font-bold  rounded-full tracking-wide text-stone-800 hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 active:bg-black active:text-yellow-300 disabled:cursor-not-allowed disabled:bg-yellow-100";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " text-xs px-2 py-2 md:px-5 md:py-2",
    secondary:
      " text-sm border-2 border-stone-300 bg-transparent uppercase font-bold  rounded-full tracking-wide text-stone-800 hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-1 active:bg-black active:text-stone-300 focus:text-stone-800 disabled:cursor-not-allowed disabled:bg-yellow-100 px-4 py-2.5 md:px-6 md:py-3.5",
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm '
    };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
