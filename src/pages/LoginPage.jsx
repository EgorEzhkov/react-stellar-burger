import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { logInUser } from "../services/actions/userData";
import { useDispatch, useSelector } from "react-redux";
import { usePasswordShow } from "../utils/util";

const LoginPage = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const passwordShow = usePasswordShow();

  const dispatch = useDispatch();

  const userLogInSuccess = useSelector((store) => {
    return store.userData.logInUserSuccess;
  });

  const logIn = (e) => {
    e.preventDefault();
    dispatch(logInUser(loginValue, passwordValue));
    return userLogInSuccess ? (setLoginValue(""), setPasswordValue("")) : null;
  };

  return (
    <div>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setLoginValue(e.target.value);
            }}
            type="email"
            value={loginValue}
            placeholder="E-mail"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type={`${passwordShow.type}`}
            value={passwordValue}
            icon={`${passwordShow.icon}`}
            placeholder="Пароль"
            onIconClick={() => {
              passwordShow.showPassword();
            }}
          ></Input>
        </div>
        <div className={`${styles.button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large" onClick={logIn}>
            Войти
          </Button>
        </div>
      </form>
      <div></div>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}>
        Вы - новый пользователь?&nbsp;
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Забыли пароль?&nbsp;
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
