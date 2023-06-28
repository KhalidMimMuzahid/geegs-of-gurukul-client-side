import React, { useContext } from "react";
import { UIContext } from "../../../../../contexts/UIProvider/UIProvider";

const SystemSettings = () => {
  const { sideNavLayoutForMobile, setSideNavLayoutForMobile } =
    useContext(UIContext);
  const handleChangeLayout = (e) => {
    setSideNavLayoutForMobile(e.target.value);
    localStorage.setItem("sideNavLayoutForMobile", e.target.value);
  };
  return (
    <div>
      <div className="font-poppins">
        <label htmlFor="side-nav-layout-for-mobile">Select layout style</label>
        <select
          className="input input-success ml-5"
          onChange={handleChangeLayout}
          name="sideNavLayoutForMobile"
          id="side-nav-layout-for-mobile"
          defaultValue={sideNavLayoutForMobile}
        >
          <option value="left">left</option>
          <option value="bottom">bottom</option>
        </select>
      </div>
    </div>
  );
};

export default SystemSettings;
