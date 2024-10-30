import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const NotificationCard = ({ title, date, ondel }) => {


    return (
      <div className="p-4 flex justify-between rounded-b-lg">
        <div>
          <p className="text-[16px] text-[#AD957B]">{title}</p>
          <p className="text-[12px]">{date}</p>
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
