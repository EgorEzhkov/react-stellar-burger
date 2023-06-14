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
          <BurgerIcon />
          <p style={{ marginLeft: 10 }} className="text text_type_main-small">
            Конструктор
          </p>
        </div>
        <div className={styles.div}>
          <ListIcon />
          <p style={{ marginLeft: 10 }} className="text text_type_main-small">
            Конструктор
          </p>
        </div>
        <Logo className={styles.logo} />
        <div className={styles.div}>
          <p className="text text_type_main-small">Профиль</p>
          <ProfileIcon />
        </div>
      </header>
    );
  }
}

export default AppHeader;
