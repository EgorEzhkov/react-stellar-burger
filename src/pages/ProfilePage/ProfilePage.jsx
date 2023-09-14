import styles from "./ProfilePage.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { EditIcon, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, postUserData } from "../../services/actions/userData";
import { getUserData } from "../../services/actions/userData";

export const ProfilePage = () => {
  const dispatch = useDispatch();

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
          className={({ isActive, isPending }) =>
            isPending ? styles.navLink : isActive ? styles.activeNavLink : styles.navLink
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive, isPending }) =>
            isPending ? styles.navLink : isActive ? styles.activeNavLink : styles.navLink
          }
        >
          История заказов
        </NavLink>
        <NavLink onClick={logOut} end className={styles.navLink}>
          Выход
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};
