import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, Navigate } from "react-router-dom";
import { apiResetPassword } from "../utils/api";
import { usePasswordShow } from "../utils/hooks";

const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    apiResetPassword(passwordValue, token)
      .then(() => {
        localStorage.removeItem("resetPasswordOk");
        setPasswordValue("");
        setToken("");
        return <Navigate to="/login" />;
      })
      .catch(() => {
        console.log("Неверный код из почты");
        localStorage.removeItem("resetPasswordOk");
      });
  };

  const passwordShow = usePasswordShow();

  return localStorage.getItem("resetPasswordOk") ? (
    <div>
      <form onSubmit={submit} className={styles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type={`${passwordShow.type}`}
            value={passwordValue}
            placeholder="Введите новый пароль"
            icon={passwordShow.icon}
            onIconClick={passwordShow.showPassword}
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
