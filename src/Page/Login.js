import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Button} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    button: {
        width:'40px',
        height: '20px',
        padding:'2px',
        backgroundColor: 'orange'
    },
    textUser: {
        fontSize: '12px',
        width: '200px',
        height: '22px',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textId: {
        fontSize: '12px',
        width: '230px',
        height: '22px',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textPass: {
        fontSize: '10px',
        width: '185px',
        height: '22px',
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
            <p className=" text-base pt-4 pb-9" align='center'> เข้าร่วมห้อง </p>
            <form className="flex flex-col items-center">
                <div className="box-content h-28 w-76 p-4 border-4 ">
                    <div>        
                        <div className=" flex space-x-2">
                            <p className=" flex-none text-sm" for="floatingInput">ชื่อผู้ใช้:</p>                             {/*text*/} 
                            <input class=" flex-initial w-46" className={classes.textUser} type="text" name="Enter your username"/>           {/*input username*/} 
                        </div>
                    </div>
                    <div className="pt-9">
                        <div className=" flex space-x-2">
                            <p className=" flex-none text-sm" for="floatingInput">id:</p>                                 {/*text*/}            
                            <input class=" flex-initial w-56" className={classes.textId} type="text" name="Enter your username" />           {/*input id*/}                            
                        </div>
                        <div className=" flex space-x-2 pt-1">
                            <p className=" flex-none text-sm" for="floatingPassword">Password:</p>                        {/*text*/} 
                            <input class=" flex-initial w-44" className={classes.textPass} type="password" name="Enter your Password"/>        {/*input password*/} 
                        </div>
                    </div>
                </div>
                <div className="pt-7">
                    <Button className={classes.button} type="submit" onClick={()=> navigate("/RoomMeet")}>เข้าร่วม</Button>  
                </div> 
            </form>
        </div>
            
    )
}
export default Login;


