import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import SiginUp from './COMPONENT/SiginUp';
import Login from './COMPONENT/Login';
import Protected from './COMPONENT/Protected';
import FoodFront from './COMPONENT/FoodFront';



const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='signup' element={<SiginUp />} />
    <Route path='/' element={<Login />} />
    <Route path='/food' element={<Protected />} >
      <Route path='/food' index element={<FoodFront />} />
    </Route>
  </Route>
)
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);


reportWebVitals();
