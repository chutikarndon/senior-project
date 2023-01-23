import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

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
    return(
        <div className=" flex flex-col items-center">
            {/* <div>back button</div> */}
            <p className=" text-4xl pt-12 pb-9"> ลงทะเบียนเพื่อสร้างห้อง </p>
            <form className="flex flex-col items-center">
                <div className="box-content h-46 w-96 p-6 border-4 ">
                    <div className=" flex space-x-2 pt-2">
                        <p className=" flex-none text-2xl">ชื่อจริง:</p>                                                        {/*text*/}
                        <input class=" flex-initial w-44" className={classes.textName} type="text" name="name"/>           {/*input name*/}
                    </div>
                    <div className=" flex space-x-1 pt-1">
                        <p className=" flex-none text-2xl">นามสกุล:</p>                                                      {/*text*/}
                        <input class=" flex-initial w-40" className={classes.textSur} type="text" name="username"/>        {/*input surname*/}
                    </div>
                    <div className="mt-4">
                        <div className="flex space-x-1">
                            <p className=" flex-none text-2xl">password:</p>                                                 {/*text*/}
                            <input class=" flex-initial w-28" className={classes.textPass} type="text" name="username"/>    {/*input password*/}
                        </div>
                    </div>
                </div>
                <div className="pt-7">
                    <Button className={classes.button} onClick={()=> navigate("/Idpass")}><p className=" text-xl">สร้างห้อง</p></Button>
                </div>  
            </form>
        </div>
    )
}

export default Signup;
