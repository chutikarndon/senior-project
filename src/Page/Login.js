import React, { useState, onSubmit } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100px",
    height: "40px",
    padding: "2px",
    backgroundColor: "orange",
  },
  textUser: {
    fontSize: "20px",
    position: 'absolute',
    left: '41.98%',
    right: '35.31%',
    top: '43.43%',
    bottom: '52.5%',
    width: "436px",
    height: "44px",
    padding: "2px",
    border: "0.5px solid black",
    borderRadius: "4px",
  },
  textId: {
    fontSize: "20px",
    width: "436px",
    height: "44px",
    position: 'absolute',
    left: '41.98%',
    right: '35.31%',
    top: '50.65%',
    bottom: '45.28%',
    padding: "2px",
    border: "0.5px solid black",
    borderRadius: "4px",
  },
  textPass: {
    fontSize: "20px",
    width: "436px",
    height: "44px",
    position: 'absolute',
    left: '41.98%',
    right: '35.31%',
    top: '57.96%',
    bottom: '37.96%',
    padding: "2px",
    border: "0.5px solid black",
    borderRadius: "4px",
  },
}));

const Login = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    username: "",
    roomId: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { username, roomId, password } = formValue;
  const handleSubmit = (event) => {
    console.log(formValue);
    fetch("http://localhost:7000/joinRoom", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(formValue),
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
    }).then(
      (response) => {
        if (response.status === 200) {
          alert("Success!");
          navigate("/RoomMeet", {
            state: { username: username, roomId: roomId },
          });
        } else {
          alert("ID or password is incorrect");
        }
      },
      (error) => console.log("An error occurred.", error)
    );
    event.preventDefault();
  };
  return (
    <div className=" backgroundHome bg-repeat bg-cover h-screen">
      {/* <div> button</div> back button */}
      <p className=" absolute text-[30px] left-[36.46%] right-[48.39%] top-[33.15%] bottom-[63.06%]" align="center">
        {" "}
        เข้าร่วมห้อง{" "}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div>
          <div>
            <div className=" flex space-x-2">
              <p className=" flex-none text-[20px] absolute left-[35.36%] right-[57.6%] top-[43.89%] bottom-[52.13%]" for="floatingInput">
                ชื่อผู้ใช้
              </p>{" "}
              {/*text*/}
              <input
                className={classes.textUser}
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
              />{" "}
              {/*input username*/}
            </div>
          </div>
          <div className="pt-12">
            <div className=" flex space-x-2">
              <p className=" flex-none text-[20px] absolute left-[35.36%] right-[55.52%] top-[51.11%] bottom-[44.07%]" for="floatingInput">
                รหัสห้อง
              </p>{" "}
              {/*text*/}
              <input
                className={classes.textId}
                type="text"
                name="roomId"
                value={roomId}
                onChange={handleChange}
              />{" "}
              {/*input id*/}
            </div>
            <div className=" flex space-x-2 pt-5">
              <p className=" flex-none text-[20px] absolute left-[35.36%] right-[56.3%] top-[58.33%] bottom-[38.61%]" for="floatingPassword">
                รหัสผ่าน
              </p>{" "}
              {/*text*/}
              <input
                className={classes.textPass}
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />{" "}
              {/*input password*/}
            </div>
          </div>
        </div>
        <div className="pt-7">
        <Button type="submit" className=" absolute left-[44.11%] right-[45.36%] top-[70%] bottom-[28.98%] w-[202px] h-[52px] text-[26px] text-white bg-[#CD3D3D] hover:scale-105" onClick={onSubmit}>
            เข้าร่วม
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Login;
