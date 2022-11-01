import { TextField, Typography, Paper, Container} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

// import Header from "./Header";
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
        <Container>
            <Typography variant='h2' align='center'> video</Typography>
            <Paper variant="outlined" className={classes.paper}>
                <div class="card-header" align= 'center'>
                    <p class="m-0">Login Form</p>
                    <a href="/Signup" type="button" class="btn btn-outline-primary btn-sm">Sign Up</a>
                </div>
                <div class="card-body" align= 'center'>
                    
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
                    <button type="submit" class="btn btn-primary" onClick={()=> navigate("/Header")}>Login</button>  
                </div>
            </Paper>
        </Container>
            
    )
}
export default Login;


