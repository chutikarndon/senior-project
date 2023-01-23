import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { makeStyles,Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        width:'130px',
        height: '40px',
        padding:'2px',
        backgroundColor: 'orange'
    }
}));
const Idpass = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    return(
        <div className=" flex flex-col items-center pt-11">
            <div className=" box-content h-44 w-96 p-2 border-4 ">
                <div>
                    <div className=" flex flex-row">
                        <div className=" text-xl">
                            ชื่อผู้ใช้:
                        </div>
                        <div> </div>
                    </div>    
                    <div>
                        <div className="pt-2 text-sm">ID:</div>
                        <div className=" text-xl">password:</div>
                    </div>
                </div>
                <div className="pt-2 text-xl">
                    ห้องนี้จะหมดอายุภายใน 14 วัน
                </div>
                <div className=" pt-6 pr-1 text-right">
                    <Link to="/Home" className="pt-6 text-lg underline">กลับสู่หน้าหลัก</Link>
                </div>
            </div>
            <div className="pt-4">
                <Button className={classes.button} onClick={()=> navigate("/Login")} >
                    <p className="text-xl">เข้าร่วมห้อง</p>
                </Button>
            </div>
        </div>
    )
}
export default Idpass;