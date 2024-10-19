import React, { useState } from "react";
import Modal from "react-modal";
import Segment from "../components/Profile_segment.jsx";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";


const Profile = () => {


  return (
    <div className="flex h-full overflow-y-hidden divide-x-2 pb-10 pt-16">
      <div className="flex flex-col text-white w-1/5 items-center justify-between">
        <div className="flex flex-col relative pt-6 gap-3 items-center mb-10">
          <img src={require("../Assets/profile.png")} alt="profile" width={300} height={300} className="w-28 h-28 rounded-full" />
          <div className="text-start">
            <p className="text-3xl text-center text-[#AD957B] font-bold">John Figma</p>
            <p className="text-sm text-[#484848]">Nick Name</p>
          </div>
          <div className="flew flex-col">
            <div className="flex gap-2">
              <BsFillTelephoneFill />
              <p className="text-sm">Tel: 081-234-5678</p>
            </div>
            <div className="flex gap-2">
              <MdEmail />
              <p className="text-sm">Email: meru@gmail.com</p>
            </div>
          </div>
        </div>

        <button className="mb-5 h-14 w-36 border-2 border-[#484848] rounded-lg bg-[#AD957B]">
          Edit Profile
        </button>
      </div>
      <div className="flex flex-col text-white w-4/5 px-10">
        <p className="text-3xl font-bold text-[#AD957B]">Reservations</p>
        <div className="h-16 w-1/2">
          <Segment />
        </div>
      </div>


    </div>
  );
};

export default Profile;
