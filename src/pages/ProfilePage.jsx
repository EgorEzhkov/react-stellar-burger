import styles from "./ProfilePage.module.css";
import { NavLink } from "react-router-dom";
import { EditIcon, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../services/actions/userData";
import { getUserData } from "../services/actions/userData";

export const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const name = useSelector((store) => store.userData.userData.user.name);
  const login = useSelector((store) => store.userData.userData.user.email);

  const [loginValue, setLoginValue] = useState(login);
  const [passwordValue, setPasswordValue] = useState("*******");
  const [nameValue, setNameValue] = useState(name);

  const logOut = () => {
    dispatch(logOutUser());
  };
  return (
    <div className={styles.container}>
      <div className={`mr-20 ${styles.navLinks}`}>
        <NavLink
          to="/profile"
          className={({ isActive, isPending }) =>
            isPending ? styles.navLink : isActive ? styles.activeNavLink : ""
          }
        >
          Профиль
        </NavLink>
        <NavLink to="/profile/orders" className={styles.navLink}>
          История заказов
        </NavLink>
        <NavLink onClick={logOut} end className={styles.navLink}>
          Выход
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.inputs}>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            type="text"
            icon={"EditIcon"}
            value={nameValue}
            placeholder={"Имя"}
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setLoginValue(e.target.value);
            }}
            type="email"
            icon={"EditIcon"}
            value={loginValue}
            placeholder={"Логин"}
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type="password"
            icon={"EditIcon"}
            value={passwordValue}
            placeholder={"Пароль"}
          ></Input>
        </div>
      </div>
    </div>
  );
};
