import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  return (
    <div>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            type="text"
            value={nameValue}
            placeholder="Имя"
          ></Input>
        </div>
        <div className="mb-6">
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div></div>
      <p
        className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}
      >
        Уже зарегистрированы?
        <Link to='/login' className={styles.link}> Войти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
