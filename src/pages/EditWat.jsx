import React from "react";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

const EditWat = () => {
    return (
        <div class='mx-4 mt-8 md:mx-[77px] md:mt-[70px] overflow-x-hidden'>

            <h1 className="text-[#AD957B] text-[50px] font-semibold">แก้ไขรายละเอียด</h1>
            <div className="mx-4 mt-8">
                <div>
                    <h1 className="text-white text-[30px] pb-12">
                        1.ข้อมูลของวัด
                    </h1>
                    <div className="flex items-center pb-[10rem]">
                        <p className="text-white text-[20px] pr-[7rem]">ชื่อของวัด</p>
                        <input className="w-[800px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4" placeholder="ชื่อวัด" ></input>
                    </div>
                    <div className="flex ">
                        <p className="text-white text-[20px] pr-[6.5rem]">ที่อยู่ของวัด</p>
                        <div className="flex flex-col gap-10">
                            <div className="flex gap-12">
                                <InputField label="เลขที่" id="number" />
                                <InputField label="ถนน" id="street" />
                                <InputField label="ตรอก/ซอย" id="alley" />
                            </div>
                            <div className="flex gap-12">
                                <SelectField
                                    label="จังหวัด"
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    options={['United States', 'Canada', 'Mexico']}
                                />
                                <SelectField
                                    label="อำเภอ/เขต"
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    options={['United States', 'Canada', 'Mexico']}
                                />
                                <SelectField
                                    label="ตำบล/แขวง"
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    options={['United States', 'Canada', 'Mexico']}
                                />
                                <InputField label="รหัสไปรษณีย์" id="alley" />

                            </div>
                        </div>


                    </div>

                </div>
            </div>

        </div>
    );
};

export default EditWat;