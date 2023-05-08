import React from "react";
import defaultLooader from "../../assets/gif/Gj7X.gif";
import defaultLooader2 from "../../assets/gif/HDoX.gif";
import defaultLooader3 from "../../assets/gif/IVvP.gif";
import defaultLooader4 from "../../assets/gif/JM9R.gif";
import defaultLooader5 from "../../assets/gif/giphy5.gif";
const Loader = ({ type = "default" }) => {
  return (
    <div className=''>
      <div className=''>
        {/* <img className="w-screen h-screen" src={defaultLooader} alt="" /> */}
        {/* <img className='w-screen h-screen' src={defaultLooader2} alt='' /> */}
        {/* <img className='w-screen h-screen' src={defaultLooader3} alt='' /> */}
        {/* <img className='w-screen h-screen' src={defaultLooader4} alt='' /> */}
        <img className='w-screen h-screen' src={defaultLooader5} alt='' />
      </div>
    </div>
  );
};

export default Loader;
