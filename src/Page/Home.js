import React from "react";
import {useNavigate } from "react-router-dom";
import { Button,makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        width:'20px',
        backgroundColor: 'orange'
    }
}));

const Header = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    return(
        <div>
            <div className=" container mx-auto">   
                <div className="flex flex-row justify-between">
                    <div className="flex">
                        <div className="flex-1 w-25 pt-2" href="#">
                            <p className=" text-sm">หน้าหลัก</p>    
                        </div >
                        <div className=" flex-1 w-24 pt-2" href="#" onClick={()=> navigate("/")}>
                            <p className=" text-sm">เกี่ยวกับ</p>
                        </div>
                        <div className=" flex-1 w-24 pt-2" href="#" onClick={()=> navigate("/")}>
                            <p className=" text-sm">ติดต่อเรา</p>
                        </div>
                    </div>
                    <div className="pt-2">
                        <Button className={classes.button} onClick={()=> navigate("/Login")}>เข้าร่วม</Button>
                    </div>
                </div>
            </div>
            <div>
                <Button onClick={()=> navigate("/Signup")}>สร้างห้อง</Button>
            </div>
        </div>
    )
}
export default Header;
