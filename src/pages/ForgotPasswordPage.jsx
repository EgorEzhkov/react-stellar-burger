import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();
  const checkEmail = () => {
    navigate("/reset-password", { replace: true });
  };
  return (
    <div>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
            type="email"
            value={emailValue}
            placeholder="Укажите e-mail"
          ></Input>
        </div>
        <div className={`${styles.button} mb-20`}>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            onClick={checkEmail}
          >
            Восстановить
          </Button>
        </div>
      </form>
      <div></div>
      <p
        className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}
      >
        Вспомнили пароль?
        <Link to="/register" className={styles.link}>
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
