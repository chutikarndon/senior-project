import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "40px",
    height: "20px",
    padding: "2px",
    backgroundColor: "orange",
  },
  textName: {
    fontSize: "12px",
    width: "230px",
    height: "22px",
    padding: "2px",
    border: "0.5px solid black",
    borderRadius: "4px",
  },
  textSur: {
    fontSize: "10px",
    width: "223px",
    height: "22px",
    padding: "2px",
    border: "0.5px solid black",
    borderRadius: "4px",
  },
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

    fetch("http://localhost:5000/signup", {
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
  return (
    <div className=" flex flex-col items-center">
      {/* <div>back button</div> */}
      <div>
        <p className=" text-base pt-4 pb-9"> ลงทะเบียนเพื่อสร้างห้อง </p>
      </div>
      <div className="box-content h-20 w-76 p-6 border-4 ">
        <div className=" flex space-x-2 pt-4">
          <p className=" flex-none text-sm">ชื่อจริง</p> {/*text*/}
          <input
            class=" flex-initial w-44"
            className={classes.textName}
            type="text"
            value={this.state.value}
            name="fname"
            onChange={this.handleChange}
          />{" "}
          {/*input name*/}
        </div>
        <div className=" flex space-x-1 pt-1">
          <p className=" flex-none text-sm">นามสกุล</p> {/*text*/}
          <input
            class=" flex-initial w-40"
            className={classes.textSur}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            name="lname"
          />{" "}
          {/*input surname*/}
        </div>
      </div>
      <div className="pt-7">
        <Button className={classes.button} onClick={() => navigate("/Idpass")}>
          สร้างห้อง
        </Button>
      </div>
    </div>
  );
};

export default Signup;
