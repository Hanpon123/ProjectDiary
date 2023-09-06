import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import Register from './Register';
import Forgot from './Forgot';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Choose from './Choose';
import High from './High';
import Uni from './Uni';
import Middle from './Middle';
import Upload from './Upload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' index element ={<Home />}></Route>
      <Route path="App" element={<App/>}></Route>
      <Route path="Register" element={<Register/>}></Route>
      <Route path="Forgot" element={<Forgot/>}></Route>
      <Route path="Choose" element={<Choose/>}></Route>
      <Route path="High" element={<High/>}></Route>
      <Route path="Uni" element={<Uni/>}></Route>
      <Route path="Middle" element={<Middle/>}></Route>
      <Route path="Upload" element={<Upload/>}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
