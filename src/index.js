import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
// import reportWebVitals from "reportWebVitals";
import {BrowserRouter} from  "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);
// reportWebVitals();

// ReactDOM.render(
//   <
//   <App />,
  
//   document.getElementById('root')
// );
