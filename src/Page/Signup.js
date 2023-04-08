import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import ReactDOM from "react-dom/client";
import { data } from "autoprefixer";

const useStyles = makeStyles((theme) => ({
    button: {
        width:'100px',
        height: '40px',
        padding:'2px',
        backgroundColor: 'orange'
    },
    textName: {
        fontSize: '12px',
        width: '436px',
        height: '44px',
        position:' absolute',
        left: '42.71%',
        right: '34.58%',
        top: '41.67%',
        bottom: '54.26%',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textSur: {
        fontSize: '10px',
        width: '436px',
        height: '44px',
        position: 'absolute',
        left: '42.71%',
        right: '34.58%',
        top: '49.17%',
        bottom: '46.76%',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textPass: {
        fontSize: '10px',
        width: '436px',
        height: '44px',
        position: 'absolute',
        left: '42.71%',
        right: '34.58%',
        top: '56.3%',
        bottom: '39.63%',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    }
}));

class signupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fname: "", lname: "" };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    alert("A form was submitted: " + this.state);

    fetch("/signup", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    event.preventDefault();
  };
}

const Signup = () => {
    const classes = useStyles();
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    fname: "",
    lname: "",
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
  const { fname, lname, password } = formValue;
  const handleSubmit = (event) => {
    alert("Success!");
    console.log(formValue);
    fetch("/createRoom", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(formValue),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => response.json(),
        (error) => console.log("An error occurred.", error)
      )
      .then(data => navigate("/Idpass",{state:data}))
    event.preventDefault();
  };
    return(
      <div className=" backgroundHome bg-repeat bg-cover h-screen">
          {/* <div>back button</div> */}
          <p className=" text-[30px] absolute left-[36.82%] right-[37.24%] top-[31.94%] bottom-[64.07%]"> ลงทะเบียนเพื่อสร้างห้อง </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div>
              <div className=" flex space-x-2 pt-2">
                <p className=" flex-none text-[20px] absolute left-[35.36%] right-[56.82%] top-[42.31%] bottom-[53.7%]">ชื่อจริง</p> {/*text*/}
                <input
                  class=" flex-initial w-44"
                  className={classes.textName}
                  type="text"
                  name="fname"
                  value={fname}
                  onChange={handleChange}
                />{" "}
                {/*input name*/}
              </div>
              <div className=" flex space-x-1 pt-1">
                <p className=" flex-none text-[20px] absolute left-[35.36%] right-[54.53%] top-[49.44%] bottom-[46.39%]">นามสกุล</p> {/*text*/}
                <input
                  class=" flex-initial w-40"
                  className={classes.textSur}
                  type="text"
                  name="lname"
                  value={lname}
                  onChange={handleChange}
                />{" "}
                {/*input surname*/}
              </div>
              <div className="mt-4">
                <div className="flex space-x-1">
                  <p className=" flex-none text-[20px] absolute left-[35.36%] right-[54.53%] top-[57.13%] bottom-[38.89%]">รหัสผ่าน</p> {/*text*/}
                  <input
                    class=" flex-initial w-28"
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
              <Button type="submit" className="absolute left-[45.26%] right-[43.02%] top-[66.39%] bottom-[28.52%] w-[225px] h-[55px] text-[26px] text-white bg-[#CD3D3D] hover:scale-105">
                สร้างห้อง
              </Button>
            </div>
          </form>
      </div>
    )
}

export default Signup;
