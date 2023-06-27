import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./appHeader.module.css";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.div}>
          <a href="#" className={styles.a}>
            <BurgerIcon type="primary" />
            <p style={{ marginLeft: 10, color: 'white' }} className="text text_type_main-small">
              Конструктор
            </p>
          </a>
          <a href="#" className={styles.a}>
            <ListIcon type="secondary"/>
            <p style={{ marginLeft: 10 }} className="text text_type_main-small">
              Лента заказов
            </p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="#" className={styles.a}>
          <p style={{ marginRight: 10 }} className="text text_type_main-small">
            Личный кабинет
          </p>
          <ProfileIcon type="secondary" />
        </a>
      </header>
    );
  }
}

export default AppHeader;
