import React, { useState } from 'react';
import InputField from '../components/editProfileField';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, nickname, telephone, email });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 mx-auto max-w-md p-4 h-auto"
    >
      <div className="flex flex-col items-center text-white">
        {profileImage ? (
          <img 
            src={profileImage} 
            alt="Profile Preview" 
            className="w-24 h-24 rounded-full mb-4" 
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="mb-4 w-full text-white"
        />
      </div>


      <InputField 
        label="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required
        className="w-full"  
      />
      <InputField 
        label="Nickname" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
        required
        className="w-full"  
      />
      <InputField 
        label="Telephone" 
        type="tel"
        value={telephone} 
        onChange={(e) => setTelephone(e.target.value)} 
        required
        className="w-full"  
      />
      <InputField 
        label="Email" 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required
        className="w-full"  
      />

      <button 
        type="submit" 
        className="mt-4 w-full bg-[#AD957B] text-white py-2 rounded-lg hover:bg-[#A86E54]"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;
