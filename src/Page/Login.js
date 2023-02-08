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
    fontSize: "12px",
    width: "300px",
    height: "30px",
    padding: "2px",
    border: "0.5px solid black",
    borderRadius: "4px",
  },
  textId: {
    fontSize: "12px",
    width: "350px",
    height: "30px",
    padding: "2px",
    border: "0.5px solid black",
    borderRadius: "4px",
  },
  textPass: {
    fontSize: "10px",
    width: "285px",
    height: "30px",
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
    <div className=" flex flex-col items-center">
      {/* <div> button</div> back button */}
      <p className=" text-4xl pt-12 pb-9" align="center">
        {" "}
        เข้าร่วมห้อง{" "}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="box-content h-46 w-96 p-4 border-4 ">
          <div>
            <div className=" flex space-x-2">
              <p className=" flex-none text-2xl" for="floatingInput">
                ชื่อผู้ใช้:
              </p>{" "}
              {/*text*/}
              <input
                class=" flex-initial w-46"
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
              <p className=" flex-none text-2xl" for="floatingInput">
                id:
              </p>{" "}
              {/*text*/}
              <input
                class=" flex-initial w-56"
                className={classes.textId}
                type="text"
                name="roomId"
                value={roomId}
                onChange={handleChange}
              />{" "}
              {/*input id*/}
            </div>
            <div className=" flex space-x-2 pt-5">
              <p className=" flex-none text-2xl" for="floatingPassword">
                Password:
              </p>{" "}
              {/*text*/}
              <input
                class=" flex-initial w-56"
                className={classes.textId}
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
              />{" "}
              {/*input password*/}
            </div>
          </div>
        </div>
        <div className="pt-7">
        <Button type="submit" className={classes.button} onClick={onSubmit}>
            เข้าร่วม
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Login;
