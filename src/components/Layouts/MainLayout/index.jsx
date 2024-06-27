import cls from "./styles.module.scss";
import { Outlet, useParams } from "react-router-dom";
import NavBar from "../../UI/NavBar/NavBar";

export default function MainLayout() {

  return (
    <div>
      <NavBar />
      <div className={cls.content}>
      <Outlet />
      </div>
    </div>
  );
}
