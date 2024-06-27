import { useEffect } from "react";

import Products from "../Products";
import Categories from "../Categories";
import useTelegram from "../../hooks/useTelegram";
import SearchBlock from "../SearchBlock";

export default function Main() {
  // const { tg } = useTelegram();


  // useEffect(() => {
  //   tg.BackButton.hide();
  // }, []);



  return (
    <div>
      <SearchBlock />
      <Categories />
      <Products />
    </div>
  );
}
