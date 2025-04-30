import React, { useState, useContext } from "react";
import MyContext from "./MyContext";
import { db } from "../Firebase/Index";

const MyContextProvider = ({ children }) => {
  const name = "Codnetics";
  return <MyContext.Provider value={name}>{children}</MyContext.Provider>;
};
export default MyContextProvider;
