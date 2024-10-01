import React from "react";
import '../styles/EditWat.css'

const EditWat =() =>{
    return(
        <div class='editwat-container'>

            <h1 className="edit-detail font-promt">แก้ไขรายละเอียด</h1>

            <div className="information-wat">
                <h2 className="font-prompt text-white">1.ข้อมูลของวัด</h2>
            </div>

            <h2 className="font-prompt text-white">2.รูปภาพ</h2>
            <h2 className="font-prompt text-white">3.ข้อมูลสำหรับติดต่อ</h2>
            <h2 className="font-prompt text-white">4.รายละเอียดเพิ่มเติม</h2>
            <h2 className="font-prompt text-white">5.ค่าใช้จ่าย</h2>
        </div>
    );
};

export default EditWat;