import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const EditProfile = ({ isOpen, onClose }) => {
  const [useredit, setUseredit] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailPasswordForm, setShowEmailPasswordForm] = useState(false);
  const token = sessionStorage.getItem("access_token");
  const current_id = sessionStorage.getItem("currentUser_id");

  useEffect(() => {
    if (isOpen && !useredit) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${backendUrl}/users/${current_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUseredit(response.data);
          setProfileImg(response.data.profile_img);
          setFirstname(response.data.firstName);
          setLastname(response.data.lastName);
          setEmail(response.data.email);
          setPhone(response.data.phoneNumber);
          setPassword(response.data.password);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUser();
    }
  }, [isOpen, useredit, current_id, token]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PNG or JPG image.');
    }
  };

  const save_profile = async () => {
    // console.log(firstname, lastname, phone, email, password);
    // console.log(`${backendUrl}/users/${current_id}`);
    try {
      const response = await axios.put(`${backendUrl}/users/${current_id}`, 
        {
          firstname: firstname,
          lastname: lastname,
          phoneNumber: phone,
          email: email,
          password: password
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Profile updated successfully:", response.data);
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[70]">
      <div className="bg-[#1c1c1c] p-6 rounded-lg w-[400px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {showEmailPasswordForm ? 'Edit Email & Password' : 'Edit Profile'}
        </h2>
        
        {!showEmailPasswordForm ? (
          <>
            <div className="mb-4 flex justify-center">
              {profileImg ? (
                <div>
                  <img
                    src={profileImg}
                    alt="profile"
                    width={100}
                    height={100}
                    className="w-20 h-20 rounded-full"
                  />
                  <label className="mt-2 h-8 w-full border-2 border-[#484848] rounded-lg bg-[#AD957B] text-white hover:bg-[#AD957B]/90 focus:outline-none flex items-center justify-center cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <img
                    src={require('../Assets/profile.png')}
                    alt="profile"
                    width={100}
                    height={100}
                    className="w-20 h-20 rounded-full"
                  />
                  <label className="mt-2 h-8 w-full border-2 border-[#484848] rounded-lg bg-[#AD957B] text-white hover:bg-[#AD957B]/90 focus:outline-none flex items-center justify-center cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-white">Firstname:</label>
              <input
                className="w-full p-2 border rounded"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Lastname:</label>
              <input
                className="w-full p-2 border rounded"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Phone:</label>
              <input
                className="w-full p-2 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-[#AD957B] text-white rounded"
                onClick={() => setShowEmailPasswordForm(true)}
              >
                Email & Password
              </button>
              <div className="flex">
                <button
                  className="mr-2 px-4 py-2 bg-[#181914] text-white rounded"
                  onClick={() => {
                    onClose();
                    setShowEmailPasswordForm(true);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#AD957B] text-white rounded"
                  onClick={() => {
                    save_profile();
                    onClose();
                    setShowEmailPasswordForm(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-white">Email:</label>
              <input
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Password:</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Enter new password"
              />
            </div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-[#AD957B] text-white rounded"
                onClick={() => setShowEmailPasswordForm(false)}
              >
                Back to Profile
              </button>
              <div className="flex">
                <button
                  className="mr-2 px-4 py-2 bg-[#181914] text-white rounded"
                  onClick={() => {
                    onClose();
                    setShowEmailPasswordForm(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#AD957B] text-white rounded"
                  onClick={() => {
                    save_profile();
                    onClose();
                    setShowEmailPasswordForm(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
