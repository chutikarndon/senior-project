import React from "react";
import {useNavigate } from "react-router-dom";
import { Breadcrumbs, Grid, makeStyles, Link ,AppBar, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container :{
        display: 'block',
        margin: 'bottom'
    }
}));

const Header = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    return(
        <div>    
            <AppBar position="fixed" color="transparent">
                <Grid xs= {6} spacing = {3}>
                    <Breadcrumbs>
                        <Link href="#">
                            หน้าหลัก
                        </Link>
                        <Link href="#" onClick={()=> navigate("/")}>
                            เกี่ยวกับ
                        </Link>
                        <Link href="#" onClick={()=> navigate("/")}>
                            ติดต่อเรา
                        </Link>
                    </Breadcrumbs>
                    <div>
                        <button class="btn btn-outline-primary" type="submit" id="button-addon2" onClick={()=> navigate("/Login")}>เข้าร่วม</button>
                    </div>
                </Grid>
            </AppBar>
            {/* <div className={classes.container}>
                <button class="btn btn-outline-primary" type="submit" id="button-addon2" onClick={()=> navigate("/Signup")}>สร้างห้อง</button>
            </div> */}
        </div>
    )
}
export default Header;
