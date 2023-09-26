import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { apiForgotPassword } from "../utils/api";

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();
  const checkEmail = (e, email) => {
    e.preventDefault()
    apiForgotPassword(email)
      .then((res) => {
        localStorage.setItem("resetPasswordOk", res.success);
        navigate("/reset-password", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          checkEmail(e, emailValue);
        }}
        className={styles.form}
      >
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
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
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
  );
};

export default ForgotPasswordPage;
