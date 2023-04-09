import React, { createContext, useEffect, useState } from "react";

export const UIContext = createContext();
const UIProvider = ({ children }) => {
  const [dashboardDrawer, setDashboardDrawer] = useState({});
  const [p, setP] = useState(0);

  const info = { dashboardDrawer, setDashboardDrawer, p, setP };
  return <UIContext.Provider value={info}>{children}</UIContext.Provider>;
};

export default UIProvider;
