import React from "react";

import user from "../images/user.svg";
import dog from "../images/dog.svg";

const CardOne = ({ name, value, icon }) => {
  return (
    <div className="flex items-center gap-5 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center ">
        {name == "Users" ? (
          <img src={user} alt="Logo" />
        ) : (
          <img src={dog} alt="Logo" />
        )}
      </div>
      <div className="flex h-full flex-col">
        <span className="text-title-xl font-bold">{name}</span>
        <h4 className="text-title-md font-medium text-black dark:text-white">
          Count: {value}
        </h4>
      </div>
    </div>
  );
};

export default CardOne;
