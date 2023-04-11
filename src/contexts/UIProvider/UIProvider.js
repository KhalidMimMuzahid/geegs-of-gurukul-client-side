import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const UIContext = createContext();

const UIProvider = ({ children }) => {
  const info = {};
  return <UIContext.Provider value={info}>{children}</UIContext.Provider>;
};

export default UIProvider;
