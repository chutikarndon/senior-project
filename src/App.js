import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Route,Routes } from 'react-router-dom';

import Login from './component/Login';
import Header from './component/Header';
import Signup from './component/Signup';
import RoomMeet from './component/RoomMeet';

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//       borderRadius: 15,
//       margin: '30px 100px',
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: '600px',
//       border: '2px solid black',

//       [theme.breakpoints.down('xs')]: {
//           width: '90%',
//       },
//   },
//   wrapper: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       width: '100%',
//   },
// }));

const App = () => {
  // const classes = useStyles();

  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Header' element={<Header/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/RoomMeet' element={<RoomMeet/>}></Route>
    </Routes> 
  //   <div className={classes.wrapper}>
  //     <Login/>
  // </div>   
  );
}


export default App;
