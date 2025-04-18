import React from "react";
import { sCount } from "./store";

export default function Main() {
  const count = sCount.use();

  const handleClick = () => {
    sCount.set((n) => (n.value += 1));
  };

  return (
    <div>
      <h1>Admin dashboard {count}</h1>
      <button onClick={handleClick}>Up</button>
    </div>
  );
}
