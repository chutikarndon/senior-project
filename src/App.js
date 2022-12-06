import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Route,Routes } from 'react-router-dom';

import Login from './Page/Login';
import Home from './Page/Home';
import Signup from './Page/Signup';
import RoomMeet from './Page/RoomMeet';

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
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/RoomMeet' element={<RoomMeet/>}></Route>
    </Routes>  
  );
}


export default App;
