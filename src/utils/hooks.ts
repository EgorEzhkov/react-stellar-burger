import { useState } from "react";
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import { RootState, AppDispatch, AppThunk } from "../types/types";

export const usePasswordShow = () => {
  const [type, setType] = useState<string>("password");
  const [icon, setIcon] = useState<string>("HideIcon");
  const showPassword = () => {
    return type === "password" ? (setType("text"), setIcon("ShowIcon")) : (setType("password"), setIcon("HideIcon"));
  };
  return { type, icon, showPassword };
};

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 

