import { TextField, Typography} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";



import Header from "./Header";


const Login = () => {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = Header; 
        navigate(path);
    }
return(
    <div>
        <Typography variant='h2' align='center'> video</Typography>
        <div class="card">
            <div class="card-header">
                <p class="m-0">Login Form</p>
                {/* <a href="/Signup" type="button" class="btn btn-outline-primary btn-sm">Sign Up</a> */}
            </div>
            <div class="card-body">
                
                    {/* <% if(locals.messages.success){ %>
                    <div class="alert alert-success" role="alert">
                        <%= locals.messages.success %>
                    </div>
                    <% } %>
                    <% if(locals.messages.error){ %>
                    <div class="alert alert-danger" role="alert">
                        <%= locals.messages.error %>
                    </div>
                    <% } %> */}
                    <div class="form-floating mb-3">
                        <label for="floatingInput">username</label>
                        <TextField type="text" name="Enter your username" class="form-control" placeholder="Enter your username"/>
                    </div>
                    <div class="form-floating mb-3">
                        <label for="floatingPassword">Password</label>
                        <TextField type="Enter your Password" class="form-control" name="Enter your Password" placeholder="Enter your Password"/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={routeChange}>Login</button>
                
            </div>
        </div>
    </div>
        
    )
}
export default Login;


