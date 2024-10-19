import React, { useState } from 'react';

const EditProfile = ({ isOpen, onClose }) => {

  const [profileImg, setProfileImg] = useState('')
  const [firstname, setFirstame] = useState('John')
  const [lastname, setLastame] = useState('Figma')
  const [email, setEmail] = useState('meru@gmail.com')
  const [phone, setPhone] = useState('081-234-5678')

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
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[70]">
      <div className="bg-[#1c1c1c] p-6 rounded-lg w-[400px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <div className="mb-4 flex justify-center">
        {profileImg ? (
        <div>
          <img src={profileImg} alt='profile' width={100} height={100} className='w-20 h-20 rounded-full' />
          <label className='mt-2 h-8 w-full border-2 border-[#484848] rounded-lg bg-[#AD957B] text-white hover:bg-[#AD957B]/90 focus:outline-none flex items-center justify-center cursor-pointer'>
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
          <img src={require('../assets/profile.png')} alt='profile' width={100} height={100} className='w-20 h-20 rounded-full' />
          <label className='mt-2 h-8 w-full border-2 border-[#484848] rounded-lg bg-[#AD957B] text-white hover:bg-[#AD957B]/90 focus:outline-none flex items-center justify-center cursor-pointer'>
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
            onChange={(e) => setFirstame(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Lastname:</label>
          <input
            className="w-full p-2 border rounded"
            value={lastname}
            onChange={(e) => setLastame(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Email:</label>
          <input
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-[#181914] text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#AD957B] text-white rounded"
            onClick={() => {
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
