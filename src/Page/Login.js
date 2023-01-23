import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Button} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    button: {
        width:'100px',
        height: '40px',
        padding:'2px',
        backgroundColor: 'orange'
    },
    textUser: {
        fontSize: '12px',
        width: '300px',
        height: '30px',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textId: {
        fontSize: '12px',
        width: '350px',
        height: '30px',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textPass: {
        fontSize: '10px',
        width: '285px',
        height: '30px',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    }
}));

const Login = () => {
    const classes = useStyles();
    let navigate = useNavigate(); 
    return(
        <div className=" flex flex-col items-center">
            {/* <div> button</div> back button */}
            <p className=" text-4xl pt-12 pb-9" align='center'> เข้าร่วมห้อง </p>
            <form className="flex flex-col items-center">
                <div className="box-content h-46 w-96 p-4 border-4 ">
                    <div>        
                        <div className=" flex space-x-2">
                            <p className=" flex-none text-2xl" for="floatingInput">ชื่อผู้ใช้:</p>                             {/*text*/} 
                            <input class=" flex-initial w-46" className={classes.textUser} type="text" name="Enter your username"/>           {/*input username*/} 
                        </div>
                    </div>
                    <div className="pt-12">
                        <div className=" flex space-x-2">
                            <p className=" flex-none text-2xl" for="floatingInput">id:</p>                                 {/*text*/}            
                            <input class=" flex-initial w-56" className={classes.textId} type="text" name="Enter your username" />           {/*input id*/}                            
                        </div>
                        <div className=" flex space-x-2 pt-5">
                            <p className=" flex-none text-2xl" for="floatingPassword">Password:</p>                        {/*text*/} 
                            <input class=" flex-initial w-44" className={classes.textPass} type="password" name="Enter your Password"/>        {/*input password*/} 
                        </div>
                    </div>
                </div>
                <div className="pt-7">
                    <Button className={classes.button} type="submit" onClick={()=> navigate("/RoomMeet")}> <p className=" text-xl">เข้าร่วม</p></Button>  
                </div> 
            </form>
        </div>
            
    )
}
export default Login;


