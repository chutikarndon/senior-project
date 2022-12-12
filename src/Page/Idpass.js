import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { makeStyles,Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        width:'90px',
        height: '20px',
        padding:'2px',
        backgroundColor: 'orange'
    }
}));
const Idpass = () => {
    const classes = useStyles();
    let navigate = useNavigate();
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
                    <Link to="/Home" className="pt-6 text-xs underline">กลับสู่หน้าหลัก</Link>
                </div>
            </div>
            <div className="pt-4">
                <Button className={classes.button} onClick={()=> navigate("/Login")} >
                    <p className="text-sm">เข้าร่วมห้อง</p>
                </Button>
            </div>
        </div>
    )
}
export default Idpass;