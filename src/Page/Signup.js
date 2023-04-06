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
        width: '330px',
        height: '30px',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textSur: {
        fontSize: '10px',
        width: '323px',
        height: '30px',
        padding: '2px',
        border: '0.5px solid black',
        borderRadius: '4px'
    },
    textPass: {
        fontSize: '10px',
        width: '315px',
        height: '30px',
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
        <div className=" flex flex-col items-center">
        {/* <div>back button</div> */}
        <p className=" text-base pt-4 pb-9"> ลงทะเบียนเพื่อสร้างห้อง </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="box-content h-24 w-76 p-6 border-4 ">
            <div className=" flex space-x-2 pt-2">
              <p className=" flex-none text-sm">ชื่อจริง</p> {/*text*/}
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
              <p className=" flex-none text-sm">นามสกุล</p> {/*text*/}
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
                <p className=" flex-none text-sm">password</p> {/*text*/}
                <input
                  class=" flex-initial w-28"
                  className={classes.textPass}
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
            <Button type="submit" className={classes.button}>
              สร้างห้อง
            </Button>
          </div>
        </form>
      </div>
    )
}

export default Signup;
