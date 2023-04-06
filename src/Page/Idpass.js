import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "130px",
    height: "40px",
    padding: "2px",
    backgroundColor: "orange",
  },
}));
const Idpass = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const location = useLocation();
  return (
    <div className=" backgroundHome bg-repeat bg-cover h-screen">
      <p className=" absolute text-[30px] left-[43.39%] right-[43.39%] top-[25%]">รายละเอียดห้อง</p>
      <div>
        <div>
          <div className="flex flex-row absolute text-[20px] left-[38.12%] right-[42.5%] top-[35%] bottom-[55.93%]">
            <div >ชื่อผู้ใช้:</div>
            <div className=" mr-2">
              {location.state.fname} {location.state.lname}
            </div>
          </div>
          <div>
            <div className="flex flex-row absolute text-[20px] left-[38.12%] right-[30%] top-[43%] bottom-[46.39%]">
              <div>ID:</div>
              <div className=" ml-2">{location.state.roomId}</div>
            </div>
            <div className="flex flex-row absolute text-[20px] left-[38.12%] right-[30%] top-[51%] bottom-[38.89%]">
              <div>password:</div>
              <div>{location.state.password}</div>
            </div>
          </div>
        </div>
        <div className="absolute text-[35px] left-[34.79%] right-[34.74%] top-[65%] bottom-[34.44%] text-[#CD3D3D]">ห้องนี้จะหมดอายุภายใน 14 วัน</div>
        <div className=" pt-6 pr-1 text-right">
          <Link to="/Home" className=" text-[20px] absolute left-[55%] top-[58%] underline">
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
      <div className="pt-4">
        <Button className=" absolute left-[42.26%] right-[43.02%] top-[75%] bottom-[28.52%]  w-[202px] h-[52px] text-[26px] text-white bg-[#CD3D3D] hover:scale-105" onClick={() => navigate("/Login")}>
          <p>เข้าร่วมห้อง</p>
        </Button>
      </div>
    </div>
  );
};
export default Idpass;
