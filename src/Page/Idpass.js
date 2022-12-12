import React from "react";
import { Link } from "react-router-dom";

const Idpass = () => {
    return(
        <div className=" flex flex-col items-center pt-11">
            <div className=" box-content h-36 w-80 p-2 border-4 ">
                <div>
                    <div className=" text-sm">
                        ชื่อผู้ใช้:
                    </div>
                    <div>
                        <div className="pt-2 text-sm">ID:</div>
                        <div className=" text-sm">password:</div>
                    </div>
                </div>
                <div className="pt-2 text-sm">
                    ห้องนี้จะหมดอายุภายใน 14 วัน
                </div>
                <div className=" pt-6 pr-1 text-right">
                    <Link to="/Home" className="pt-6 text-xs">กลับสู่หน้าหลัก</Link>
                </div>
            </div>
            <div>
                <button className=" pt-4 text-base">เข้าร่วมห้อง</button>
            </div>
        </div>
    )
}
export default Idpass;