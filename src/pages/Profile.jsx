import React, { useState } from "react";
import Modal from "react-modal";
import Segment from "../components/Profile_segment.jsx";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import EditProfile from "./EditProfile.jsx";


Modal.setAppElement("#root");

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

        <button onClick={toggleModal} className="mb-5 h-14 w-36 border-2 border-[#484848] rounded-lg bg-[#AD957B]">
          Edit Profile
        </button>
      </div>
      <div className="flex flex-col text-white w-4/5 px-10">
        <p className="text-3xl font-bold text-[#AD957B]">Reservations</p>
        <div className="h-16 w-1/2">
          <Segment />
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-[#292725] p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button onClick={toggleModal} className="text-gray-200"><IoMdCloseCircle /></button>
          </div>
          <EditProfile />
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
