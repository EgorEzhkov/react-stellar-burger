import styles from "./ProfilePage.module.css";
import { NavLink } from "react-router-dom";
import { EditIcon, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, postUserData } from "../services/actions/userData";
import { getUserData } from "../services/actions/userData";

export const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const name = useSelector((store) => store.userData.userData.user.name);
  const login = useSelector((store) => store.userData.userData.user.email);

  const [loginValue, setLoginValue] = useState(login);
  const [passwordValue, setPasswordValue] = useState("fdsafdsaf");
  const [nameValue, setNameValue] = useState(name);

  const [disabledName, setDisabledName] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);

  const lala = () => {
    alert("ИДИ ПОКА НАААААА НЕБО ЗА ЗВЕЗДОЧКОЙ");
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("fdsaf");
  };

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
        <form
          onSubmit={(e) => {
            return submit(e), setDisabledName(true), dispatch(postUserData(nameValue));
          }}
          className="mb-6"
        >
          <Input
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            type="text"
            icon={"EditIcon"}
            value={nameValue}
            placeholder={"Имя"}
            disabled={disabledName}
            onIconClick={() => {
              disabledName === false ? setDisabledName(true) : setDisabledName(false);
            }}
          ></Input>
        </form>
        <form
          onSubmit={(e) => {
            return submit(e), setDisabledLogin(true), dispatch(postUserData(loginValue));
          }}
          className="mb-6"
        >
          <Input
            onChange={(e) => {
              setLoginValue(e.target.value);
            }}
            type="email"
            icon={"EditIcon"}
            value={loginValue}
            placeholder={"Логин"}
            disabled={disabledLogin}
            onIconClick={() => {
              disabledLogin === false ? setDisabledLogin(true) : setDisabledLogin(false);
            }}
          ></Input>
        </form>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type={"password"}
            icon={"EditIcon"}
            value={passwordValue}
            placeholder={"Пароль"}
            disabled={true}
            onIconClick={() => {
              lala();
            }}
          ></Input>
        </div>
      </div>
    </div>
  );
};
