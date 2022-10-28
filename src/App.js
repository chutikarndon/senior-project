import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { BrowserRouter as Router,Routes } from 'react-router-dom';

import Login from './component/Login';
// import Header from './component/Header';
// import Signup from './component/Signup';

const useStyles = makeStyles((theme) => ({
  appBar: {
      borderRadius: 15,
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      border: '2px solid black',

      [theme.breakpoints.down('xs')]: {
          width: '90%',
      },
  },
  wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    // <Router>
    //   <div className={classes.wrapper}>
    //     <Routes exact path='/' component = {Login}/>
    //     <Routes path='/Header' component = {Header}/>
    //     <Routes path='/Signup' component = {Signup}/>
    //   </div> 
    // </Router> 
    <div className={classes.wrapper}>
      <Login/>
  </div>   
  );
}


export default App;
