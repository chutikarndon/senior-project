import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100px",
    height: "40px",
    padding: "2px",
    backgroundColor: "orange",
  },
  buttons: {
    width: "100px",
    height: "40px",
    padding: "2px",
    backgroundColor: "orange",
  },
}));

const Header = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch("/festival").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className=" container mx-auto">
        <div className="flex flex-row justify-between">
          <div className="flex">
            <div className="flex-1 w-25 pt-2" href="#">
              <Link className=" text-xl underline">หน้าหลัก</Link>
            </div>
            <div
              className=" flex-1 w-24 pt-2 "
              href="#"
              onClick={() => navigate("/")}
            >
              <Link className=" text-xl underline">เกี่ยวกับ</Link>
            </div>
            <div
              className=" flex-1 w-24 pt-2 "
              href="#"
              onClick={() => navigate("/")}
            >
              <Link className=" text-xl underline">ติดต่อเรา</Link>
            </div>
          </div>
          <div className="pt-2">
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => navigate("/Login")}
            >
              <p className="text-xl">เข้าร่วม</p>
            </Button>
          </div>
        </div>
      </div>
      <div>
        {typeof backendData.festival === "undefined" ? (
          <div><svg className=' animate-spin w-5 h-5'></svg></div>
        ) : (
          backendData.festival.map((festival, i) => <p key={i}>{festival}</p>)
        )}
      </div>
      <div className=" pt-16 ">
        <Button
          className={classes.buttons}
          variant="contained"
          onClick={() => navigate("/Signup")}
        >
          <p className="text-xl">สร้างห้อง</p>
        </Button>
      </div>
    </div>
  );
};
export default Header;
