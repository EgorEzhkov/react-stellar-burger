import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiResetPassword } from "../utils/api";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState("");
  const [token, setToken] = useState("");
  const submit = (e) => {
    e.preventDefault();
    apiResetPassword(passwordValue, token)
      .then(() => {
        localStorage.removeItem("resetPasswordOk");
        setPasswordValue("");
        setToken("");
        return <Navigate to="/login" />;
      })
      .catch(() => {
        console.log("Неверный код из почты");
      });
  };

  const resetPassword = () => {};

  return localStorage.getItem("resetPasswordOk") ? (
    <div>
      <form onSubmit={submit} className={styles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type="password"
            value={passwordValue}
            placeholder="Введите новый пароль"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setToken(e.target.value);
            }}
            type="text"
            value={token}
            placeholder="Введите код из письма"
          ></Input>
        </div>
        <div className={`${styles.button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>
      <div></div>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}>
        Вспомнили пароль?&nbsp;
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default ResetPasswordPage;
