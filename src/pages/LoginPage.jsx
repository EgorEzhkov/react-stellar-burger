import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

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
            type="password"
            value={passwordValue}
            icon={"HideIcon"}
            placeholder="Пароль"
          ></Input>
        </div>
        <div className={`${styles.button} mb-20`}>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            onClick={() => {
              console.log(loginValue, passwordValue);
            }}
          >
            Войти
          </Button>
        </div>
      </form>
      <div></div>
      <p
        className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}
      >
        Вы - новый пользователь?
        <Link to='/register' className={styles.link}> Зарегистрироваться</Link>
      </p>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.text}`}
      >
        Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default LoginPage;
