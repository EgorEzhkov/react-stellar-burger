import styles from "./ProfilePage.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "../../utils/hooks";
import { logOutUser } from "../../services/actions/userData";
import { getUserData } from "../../services/actions/userData";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const logOut = () => {
    dispatch(logOutUser());
  };
  return (
    <div className={styles.container}>
      <nav className={`mr-20 ${styles.navLinks}`}>
        <NavLink
          to="/profile/user"
          className={({ isActive, isPending }) => (isPending ? styles.navLink : isActive ? styles.activeNavLink : styles.navLink)}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive, isPending }) => (isPending ? styles.navLink : isActive ? styles.activeNavLink : styles.navLink)}
        >
          История заказов
        </NavLink>
        <NavLink to="" onClick={logOut} end className={styles.navLink}>
          Выход
        </NavLink>
        {location.pathname === "/profile/user" && (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        )}
        {location.pathname === "/profile/orders" && (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
