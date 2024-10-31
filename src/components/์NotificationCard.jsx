import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const NotificationCard = ({ title, date, ondel, description }) => {
  

    return (
      <div className="p-4 flex justify-between rounded-b-lg">
        <div>
          <p className="text-[18px] text-[#b39a7f]">{title}</p>
          <p className="text-[12px] text-[#ffffff]">{description}</p>
          <p className="text-[12px] text-[#d5d5d5]">{date}</p>
        </div>
        <div className="flex justify-center items-center">
          <button onClick={ondel}>
            <FontAwesomeIcon icon={faTimes} className="text-2xl text-[#9A9A9A]" />
          </button>
        </div>
      </div>
    );
  };
  

export default NotificationCard;
