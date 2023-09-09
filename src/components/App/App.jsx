import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredientsData";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import { getUserData } from "../../services/actions/userData";
import { ProfilePage } from "../../pages/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userData);
  console.log(user);
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserData());
  }, [dispatch]);

  const ingredientsRequest = useSelector((store) => store.ingredients.ingredientsRequest);

  return (
    <div className={styles.app}>
      <pre
        style={{
          margin: "0",
          fontSize: "1.5rem",
        }}
      >
        {ingredientsRequest ? (
          <h1>Идет загрузка данных</h1>
        ) : (
          <>
            <AppHeader />
            <main className={styles.main}>
              <Routes>
                <Route path="/" element={<OnlyAuth component={<HomePage />} />} />
                <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
                <Route
                  path="/forgot-password"
                  element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
                />
                <Route
                  path="/reset-password"
                  element={<OnlyUnAuth component={<ResetPasswordPage />} />}
                />
                <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
              </Routes>
            </main>
          </>
        )}
      </pre>
    </div>
  );
}

export default App;