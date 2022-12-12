import React from 'react';
import { Route,Routes } from 'react-router-dom';
// import './styles/main.css';

import Login from './Page/Login';
import Home from './Page/Home';
import Signup from './Page/Signup';
import RoomMeet from './Page/RoomMeet';
import Idpass from './Page/Idpass';

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/Idpass' element={<Idpass/>}></Route>
        <Route path='/RoomMeet' element={<RoomMeet/>}></Route>
      </Routes>
    </div>
      
  );
}


export default App;
