import React from "react";

const SaLa = ({ title, description, price, imageUrl }) => {
  return (
    <div className="card-item grid grid-rows-3 h-[115px] w-[185px]">
      <div className="card-img-section row-span-2">
        <img src={imageUrl} alt={title} className="rounded-t-lg" />
      </div>
      <div className="row-span-1 ml-2 mt-">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="text-white font-bold text-[18px]">
          {price}
          <span className="text-[8px] font-medium"> .- /ชุด</span>
        </div>
      </div>
    </div>
  );
};

export default SaLa;
