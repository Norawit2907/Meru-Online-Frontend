import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Addon from "../components/Addon";
import Dropzone from "../components/Dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Reorder, motion, useDragControls } from "framer-motion";
import {
  getAddressByWatId,
  getWatById,
  updateAddressByWatId,
  updateWat,
} from "../services/wat";
import { UploadImage } from "../services/imageupload";

const addonData = [
  {
    imageUrl: "./addon.png",
    title: "ชุดครอบครัว",
    description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
    price: "750 .- /ชุด",
  },
  {
    imageUrl: "./addon.png",
    title: "ชุดงานเลี้ยง",
    description: "ครบทุกสิ่งสำหรับงานเลี้ยง",
    price: "1,500 .- /ชุด",
  },
  {
    imageUrl: "./addon.png",
    title: "ชุดพรีเมียม",
    description: "เหมาะสำหรับการใช้งานพิเศษ",
    price: "2,000 .- /ชุด",
  },
];

const EditWat = () => {
  const [addressForm, setAddressForm] = useState({
    address: "",
    street: "",
    alley: "",
    province: "",
    distrinct: "",
    sub_distrinct: "",
    postalCode: "",
    latitude: "",
    longtitude: "",
  });

  const [watForm, setWatForm] = useState({
    name: "",
    admin_id: "",
    admin_name: "",
    phoneNumber: "",
    line_id: "",
    Facebook: "",
    description: "",
    max_workload: 0,
  });

  const [imagefiles, setimagefiles] = useState([]);

  const handleWatFormChange = (event) => {
    setWatForm({
      ...watForm,
      [event.target.name]: event.target.value,
    });
    // console.log(watForm);
  };

  const handleAddressFormChange = (event) => {
    setAddressForm({
      ...addressForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleworkload = (set) => {
    let cur = watForm.max_workload;
    if (set == "i") {
      setWatForm({
        ...watForm,
        max_workload: (cur += 1),
      });
    } else if (set == "d") {
      if (watForm.max_workload > 0) {
        setWatForm({
          ...watForm,
          max_workload: (cur -= 1),
        });
      }
    }
    // console.log(watForm.max_workload);
  };

  const handleUploadImage = (event) => {
    const filename = event.target.value;
    const filetype = filename.split(".").pop();
    if (filetype == "jpg" || filetype == "jpeg" || filetype== "png") {
        const url = URL.createObjectURL(event.target.files[0])
        const imageobject = {
            file: event.target.files[0],
            url: url,
            name: filename
        }
        // console.log(filename);
        
        
      setimagefiles([...imagefiles, imageobject]);
    //   append({file: event.target.files[0], url: URL.createObjectURL(event.target.files[0])})
      
    } else {
      alert("Invalid file type");
    }
  };

  const handleRemoveImage = (file, url, name) => {
    const newimage = imagefiles.filter((item) => item.file != file && item.url != url && item.name != name)
    setimagefiles(newimage)
 }

  // useEffect(() => {
  //   // console.log("effect", imagefiles);
  // }, [imagefiles]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log("pressed");

    let pictures = [];
    imagefiles.map(async (item) => {
      if(item.file != null){
        const link = await UploadImage(item.file)
        // console.log("link", link);
        item.url = link
        pictures = [...pictures, item]
      }
    })
    
    const wat_id = sessionStorage.getItem("wat_id");
    const admin_id = sessionStorage.getItem("currentUser_id");
    const resAddress = await updateAddressByWatId(
      wat_id,
      addressForm.address,
      addressForm.street,
      addressForm.alley,
      addressForm.province,
      addressForm.distrinct,
      addressForm.sub_distrinct,
      addressForm.postalCode,
      addressForm.latitude,
      addressForm.longtitude
    );
    if (!resAddress) {
      alert("can't update address");
    }
    const response = await updateWat(
      wat_id,
      admin_id,
      watForm.admin_name,
      watForm.name,
      watForm.phoneNumber,
      watForm.line_id,
      watForm.Facebook,
      0,
      0,
      watForm.max_workload,
      watForm.description,
      pictures,
      "location"
    );
    if (!response) {
      alert("can't update wat");
    } else {
      // console.log(response);
      window.location.href = `/watpage2/${wat_id}`;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
    }

    async function getData() {
      const wat_id = sessionStorage.getItem("wat_id");
      const watdata = await getWatById(wat_id);
      const addressdata = await getAddressByWatId(wat_id);
      if (watdata) {
        setWatForm({
          name: watdata.name == "-" ? "" : watdata.name,
          admin_id: watdata.admin_id == "-" ? "" : watdata.admin_id,
          admin_name: watdata.admin_name == "-" ? "" : watdata.admin_name,
          phoneNumber: watdata.phoneNumber == "-" ? "" : watdata.phoneNumber,
          line_id: watdata.line_ID == "-" ? "" : watdata.line_ID,
          Facebook: watdata.Facebook == "-" ? "" : watdata.Facebook,
          description: watdata.description == "-" ? "" : watdata.description,
          max_workload: watdata.max_workload == "-" ? "" : watdata.max_workload,
        });
      }
      if (addressdata) {
        setAddressForm(addressdata);
      }
      
      setimagefiles(watdata.picture)
  
    }
    getData();
  }, []);

  return (
    <div className="relative mx-4 mt-8 md:mx-[77px] md:mt-[70px] overflow-x-hidden">
      <button
        onClick={handlesubmit}
        className="fixed bottom-20 right-20 text-white text-2xl font-semibold p-6 px-10 bg-[#ad957b] border-4 border-white rounded-full"
      >
        Done
      </button>
      <h1 className="text-[#AD957B] text-[30px] md:text-[50px] font-semibold">
        แก้ไขรายละเอียด
      </h1>
      <div className="mx-4 mt-8 flex flex-col gap-12">
        {/* wat-info */}
        <div>
          <h1 className="text-white text-[24px] md:text-[30px] pb-8 md:pb-12">
            1.ข้อมูลของวัด
          </h1>
          <div className="flex flex-col md:flex-row  pb-16 md:pb-[8rem]">
            <p className="text-white text-[16px] md:text-[20px] md:pr-[11.2rem] mb-4 md:mb-0">
              ชื่อของวัด
            </p>
            <input
              value={watForm.name}
              name="name"
              onChange={handleWatFormChange}
              className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
              placeholder="ชื่อวัด"
            ></input>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 pb-16 md:pb-[8rem]">
            <p className="text-white text-[16px] md:text-[20px] md:pr-[10.5rem] lg:pr-[7.5rem] mb-4 md:mb-0">
              ที่อยู่ของวัด
            </p>
            <div className="lg:flex-col">
              <div className="grid grid-cols-4 gap-6 mb-2 md:flex-row">
                <div>
                  <p className="text-gray-400 mb-1">เลขที่</p>
                  <input
                    value={addressForm.address}
                    onChange={handleAddressFormChange}
                    name="address"
                    label="เลขที่"
                    id="address"
                    className="w-[200px] text-sm bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                  />
                </div>

                <div>
                  <p className="text-gray-400 mb-1">ถนน</p>
                  <input
                    value={addressForm.street}
                    onChange={handleAddressFormChange}
                    name="street"
                    label="ถนน"
                    id="street"
                    className="w-[200px] text-sm bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                  />
                </div>

                <div>
                  <p className="text-gray-400 mb-1">ซอย</p>
                  <input
                    value={addressForm.alley}
                    onChange={handleAddressFormChange}
                    name="alley"
                    label="ตรอก/ซอย"
                    id="alley"
                    className="w-[200px] text-sm bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 md:flex-row">
                <div>
                  <p className="text-gray-400 mb-1">จังหวัด</p>
                  <input
                    value={addressForm.province}
                    onChange={handleAddressFormChange}
                    name="province"
                    label="province"
                    id="province"
                    className="w-[200px] text-sm bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                  />
                </div>

                <div>
                  <p className="text-gray-400 mb-1">อำเภอ/เขต</p>
                  <input
                    value={addressForm.distrinct}
                    onChange={handleAddressFormChange}
                    name="distrinct"
                    label="distrinct"
                    id="distrinct"
                    className="w-[200px] text-sm bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                  />
                </div>

                <div>
                  <p className="text-gray-400 mb-1">ตำบล/แขวง</p>
                  <input
                    value={addressForm.sub_distrinct}
                    onChange={handleAddressFormChange}
                    name="sub_distrinct"
                    label="sub_distrinct"
                    id="sub_distrinct"
                    className="w-[200px] text-sm bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                  />
                </div>

                <div>
                  <p className="text-gray-400 mb-1">รหัสไปรษณีย์</p>
                  <input
                    value={addressForm.postalCode}
                    onChange={handleAddressFormChange}
                    name="postalCode"
                    label="postalCode"
                    id="postalCode"
                    className="w-[200px] text-sm bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <p className="text-white text-[16px] md:text-[20px] md:pr-[6.5rem] mb-4 md:mb-0">
              ระบุตำแหน่งของวัด
            </p>
            <iframe
              src={ `https://www.google.com/maps?q=${addressForm.latitude},${addressForm.longtitude}&z=16&output=embed`}
              className="w-full h-64 md:w-[950px] md:h-[638px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* wat-image */}
        <div className="flex flex-col md:flex-row">
          <h1 className="text-white text-[24px] md:text-[30px] pb-8 md:pb-12 md:pr-[9.2rem]">
            2.รูปภาพ
          </h1>

          <div className="flex flex-col w-1/2">
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-[#AD957B] border-dashed rounded-lg cursor-pointer bg-[#2b2929] hover:bg-[#2c2c2c]"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-[#AD957B]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-[#AD957B] ">
                    <span class="font-semibold">Click to upload</span>
                  </p>
                  <p class="text-xs text-[#AD957B] ">PNG, JPG or JPEG</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={handleUploadImage}
                />
              </label>
            </div>
            {
            imagefiles.length == 0 ?
                null
            :
            <div className="bg-[#2e2d2d] p-5 mt-5 rounded-lg">
              <Reorder.Group
                values={imagefiles}
                onReorder={setimagefiles}
              >
                {imagefiles.map((item, index) => (
                  <Reorder.Item
                    key={item.url}
                    value={item}

                  >
                    <div className="flex flex-row justify-between items-center m-2 p-2 rounded-lg bg-[#353333] shadow-lg">
                    
                      <img
                        src={item.url}
                        className="object-cover h-48 w-48 m-5 text-white"
                      />
                      <p className="text-white text-xl truncate">{item.name}</p>
                      <button onClick={()=>{handleRemoveImage(item.file, item.url, item.name)}} className="mr-10 ml-auto">
                        <FontAwesomeIcon  icon={faTrash} className="text-[#AD957B] h-10" />
                      </button>
                      <div className="reorder-handle"/>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
            }
          </div>
        </div>

        {/* Remaining sections like wat-contact, wat-description, and wat-price can be similarly adjusted for responsiveness */}

        {/* wat-contact */}
        <div>
          <h1 className="text-white text-[24px] md:text-[30px] pb-8 md:pb-12">
            3.ข้อมูลสำหรับติดต่อ
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
              <p className="text-white text-[16px] md:text-[20px] md:pr-[11.2rem] mb-4 md:mb-0">
                ชื่อผู้ดูแล
              </p>
              <input
                value={watForm.admin_name}
                onChange={handleWatFormChange}
                name="admin_name"
                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                placeholder="ชื่อผู้ดูแล"
              ></input>
            </div>
            <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
              <p className="text-white text-[16px] md:text-[20px] md:pr-[8.2rem] mb-4 md:mb-0">
                เบอร์โทรติดต่อ
              </p>
              <input
                value={watForm.phoneNumber}
                onChange={handleWatFormChange}
                name="phoneNumber"
                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                placeholder="เบอร์โทรติดต่อ"
              ></input>
            </div>
            <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
              <p className="text-white text-[16px] md:text-[20px] md:pr-[11.8rem] mb-4 md:mb-0">
                Line ID
              </p>
              <input
                value={watForm.line_id}
                onChange={handleWatFormChange}
                name="line_id"
                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                placeholder="Line ID"
              ></input>
            </div>
            <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
              <p className="text-white text-[16px] md:text-[20px] md:pr-[10.1rem] mb-4 md:mb-0">
                Facebook
              </p>
              <input
                value={watForm.Facebook}
                onChange={handleWatFormChange}
                name="Facebook"
                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                placeholder="Facebook"
              ></input>
            </div>
          </div>
        </div>

        {/* wat-description */}
        <div>
          <h1 className="text-white text-[24px] sm:text-[30px] pb-6 sm:pb-12">
            4.รายละเอียดเพิ่มเติม
          </h1>
          <div className="flex flex-col sm:flex-row pb-10">
            <p className="text-white text-[18px] sm:text-[20px] pb-4 sm:pb-0 sm:pr-[7rem]">
              รายละเอียดของวัด
            </p>
            <textarea
              value={watForm.description}
              onChange={handleWatFormChange}
              name="description"
              className="w-full sm:w-[700px] h-[150px] sm:h-[200px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] p-4 pb-[5rem] sm:pb-[9rem]"
              placeholder="รายละเอียดของวัด"
            />
          </div>
          <div className="relative flex flex-col sm:flex-row pb-10  gap-4 sm:gap-0">
            <p className="text-white text-[18px] sm:text-[20px] sm:pr-[3rem]">
              ใน 1 วันสามารถรับได้กี่งาน
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                id="decrement-button"
                onClick={() => {
                  handleworkload("d");
                }}
                data-input-counter-decrement="counter-input"
                className="flex-shrink-0 bg-[#484848] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-[#383838] inline-flex items-center justify-center rounded-xl h-6 w-6 sm:h-5 sm:w-5 focus:ring-gray-100"
              >
                <svg
                  className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-[#AD957B] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <p className="flex-shrink-0 text-[#AD957B] dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[3rem] sm:max-w-[2.5rem] text-center">
                {watForm.max_workload}
              </p>
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="counter-input"
                onClick={() => {
                  handleworkload("i");
                }}
                className="flex-shrink-0 bg-[#484848] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-[#383838] inline-flex items-center justify-center rounded-xl h-6 w-6 sm:h-5 sm:w-5 focus:ring-gray-100"
              >
                <svg
                  className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-[#AD957B] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-white text-[30px] pb-10">5.ค่าใช้จ่าย</h1>
            <Addon
              title={"สิ่งของที่วัดเตรียมให้ (ลูกค้าต้องจ่าย)"}
              addonList={addonData}
            />
            <Addon title={"ศาลาที่มีให้"} addonList={addonData} />
            <Addon title={"บริการระหว่างอภิธรรมศพ"} addonList={addonData} />
            <Addon
              title={"สินค้าและบริการ (ลูกค้าเลือกจ่าย)"}
              addonList={addonData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWat;
