import { useState } from "react";

export const usePasswordShow = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("HideIcon");
  const showPassword = () => {
    return type === "password"
      ? (setType("text"), setIcon("ShowIcon"))
      : (setType("password"), setIcon("HideIcon"));
  };
  return { type, icon, showPassword };
};
