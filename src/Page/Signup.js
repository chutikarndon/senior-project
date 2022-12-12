import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";

const Signup = () => {
    let navigate = useNavigate();
    return(
        <div className=" flex flex-col items-center">
            {/* <div>back button</div> */}
            <div >
                <p className=" text-base pt-4 pb-9"> ลงทะเบียนเพื่อสร้างห้อง </p>
            </div>
            <div className="box-content h-20 w-76 p-6 border-4 ">
                <div className=" flex space-x-2">
                    <p className=" flex-none text-sm">ชื่อจริง</p>
                    <TextField className=" flex-initial w-44" type="text" name="name"/>
                </div>
                <div className=" flex space-x-1">
                    <p className=" flex-none text-sm">นามสกุล</p>
                    <TextField className=" flex-initial w-40" type="text" name="username"/>
                </div>
            </div>
            <div className="pt-7">
                <button type="submit" class="btn btn-primary">สร้างห้อง</button>
            </div> 
        </div>
    )
}

export default Signup;
