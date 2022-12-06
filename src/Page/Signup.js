import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const Signup = () => {
    let navigate = useNavigate();
    return(
        <div >
           <div >
                <Typography variant="h6" align="center"> ลงทะเบียนเพื่อสร้างห้อง </Typography>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div align='center'>
                        <label>ชื่อจริง</label>
                        <input type="text" name="name" class="form-control" />
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="form-floating" align='center'>
                        <label>นามสกุล</label>
                        <input type="text" name="username" class="form-control"/>
                    </div>
                </div>
            </div>
            <div align='center'>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </div> 
        </div>
    )
}

export default Signup;
