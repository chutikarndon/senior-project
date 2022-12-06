import React from "react";
import {useNavigate } from "react-router-dom";
import { Breadcrumbs, Grid, makeStyles, Link ,AppBar, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container :{
        display: 'block',
        margin: 'bottom'
    },
    button: {
        display: 'inline-block'
    },
    menu: {
        position: 'center'
    }
}));

const Header = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    return(
        <div>    
            <div position="fixed">
                <Grid xs= {12}>
                    <Breadcrumbs className={classes.menu}>
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
                    <div className={classes.button}>
                        <button class="btn btn-outline-primary" type="submit" id="button-addon2" onClick={()=> navigate("/Login")}>เข้าร่วม</button>
                    </div>
                </Grid>
            </div>
            <div className={classes.container}>
                <button class="btn btn-outline-primary" type="submit" id="button-addon2" onClick={()=> navigate("/Signup")}>สร้างห้อง</button>
            </div>
        </div>
    )
}
export default Header;
