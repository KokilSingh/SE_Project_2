import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/HomePage';
import Register from './views/Register';
import SignIn from './views/SignIn';
import Create from './views/Create';
import Apply from './views/Apply';
import Applications from './views/Applications';
import ViewMyAppliedProjects from './views/ViewMyAppliedProjects';
import ViewMySelectedProjects from './views/ViewMySelectedProjects';
import Profile from './views/Profile';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Slide} from 'react-toastify';
import MyProjects from './views/MyProjects';

const App = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />

      <Routes>
        <Route exact path='/' element={<SignIn/>}/>
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/create' element={<Create/>} />
        <Route exact path='/apply/:prj_id/:title' element={<Apply/>} />
        <Route exact path='/applications' element={<Applications/>}/>
        <Route exact path='/applied-projects' element={<ViewMyAppliedProjects/>}/>
        <Route exact path='/selected-projects' element={<ViewMySelectedProjects/>} />
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/my-projects' element={<MyProjects/>}/>
        {/* Other routes */}
      </Routes>
      
    </div>
  )
}

export default App
