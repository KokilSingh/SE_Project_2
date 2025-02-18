import React,{useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios";
import { BsChevronLeft } from "react-icons/bs";
import '../views/apply.css';
import Navbar from "./NavbarHandlers.js";
import '../views/global.css';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Apply = () => {
    const {prj_id,title} = useParams();
    const navigate = useNavigate();
    const [proposal,setProposal] =useState('');

    // fetch project details using id... so that details can be confirmed
    const goBack = ()=>{
        
        navigate('/home');
      };
  
      const logout = () => {
        localStorage.clear();
        navigate("/");
      };

      const handleSubmit =(e)=>{
        e.preventDefault();
        // Filter out empty skills
        if(!proposal)
        {
          alert('Please add SOP');
          return;
        }

        console.log('Submit button clicked');
        // Add user id to applied_users in Project Table
        // Add project_id(id) and proposal(desc) to User Table
        const id = localStorage.getItem("idToken");

          // Handle form submission here
          //console.log({prj_id,proposal});
          if (id) {
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/apply`,
                { project_id:prj_id, proposal},
                {
                  headers: {
                    authorization: `${id}`,
                  },
                }
              )
              .then((response) => {
                //alert('Successfully applied for project ID');
                console.log(response.data); // Logging the response data to console
                toast.success('Applied Successfully', {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                  theme: "dark",
                  });
                navigate("/home");
              })
              .catch((error) => {
                if(error.response.status===401)
                {
                    console.log("Unauth")
                    toast.error('Logged Out', {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: false,
                      progress: undefined,
                      theme: "dark",
                      });
                    localStorage.clear();
                    navigate("/");
                }
                console.error("Error fetching data:", error);
                toast.error('Already Applied', {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                  theme: "dark",
                  });
                navigate("/home");
              });
          } else {
            console.error("idToken is null or undefined");
          }

      }

  return (
    <div>
      <Navbar/>
    <div className="apply-form3">
    <div className="d-flex justify-content-between align-items-left mb-3">
        <div className="col-auto">
          <button className="btn btn-link" onClick={goBack}>
            <BsChevronLeft size={24} />
          </button>
        </div>
        {/* <div className="col-auto">
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>*/}
      </div> 
      <form onSubmit={handleSubmit} className="apply-form2">
  <h1>Apply for the Project {title}</h1>
  <div>
    <label className="form-label2">SOP: Your Proposal to help your candidature:</label>
    <textarea
      value={proposal}
      onChange={(e) => setProposal(e.target.value)}
      className="form-control2"
    ></textarea>
  </div>
  <button type="submit" className="btn2">
    Submit
  </button>
</form>

    </div>
    </div>
  )
}

export default Apply
