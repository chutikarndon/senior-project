import {TextField} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        width:'300px',
        border: '2px solid black',
        padding: '10px 20px',
        margin: '8px 8px 8px 175px'
    }
}));

const Login = () => {
    const classes = useStyles();
    let navigate = useNavigate(); 
    return(
        <div className=" flex flex-col items-center">
            {/* <div> button</div> back button */}
            <p className=" text-base pt-4 pb-9" align='center'> เข้าร่วมห้อง </p>
            <div className="box-content h-28 w-76 p-4 border-4 ">
                <div>        
                    <div className=" flex space-x-2">
                        <p className=" flex-none text-sm" for="floatingInput">ชื่อผู้ใช้:</p>                             {/*text*/} 
                        <TextField className=" flex-initial w-46" type="text" name="Enter your username"/>           {/*input username*/} 
                    </div>
                </div>
                <div className="pt-4">
                    <div className=" flex space-x-2">
                        <p className=" flex-none text-sm" for="floatingInput">id:</p>                                 {/*text*/}            
                        <TextField className=" flex-initial w-56" type="text" name="Enter your username" />           {/*input id*/}
                    </div>
                    <div className=" flex space-x-2">
                        <p className=" flex-none text-sm" for="floatingPassword">Password:</p>                        {/*text*/} 
                        <TextField className=" flex-initial w-44" type="password" name="Enter your Password"/>        {/*input password*/} 
                    </div>
                </div>
            </div>
            <div className="pt-7">
                <button type="submit" onClick={()=> navigate("/RoomMeet")}>เข้าร่วม</button>  
            </div> 
        </div>
            
    )
}
export default Login;


