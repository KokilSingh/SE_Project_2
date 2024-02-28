import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Upload from '../components/Upload';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [res_link, setResume] = useState("");
  const [Save_active,setDisable] =useState(false);

  const handleUpload = (url) => {
    setResume(url);
  };

  const onSubmit = (e) => {
    setDisable(true);
    console.log("Submit pressed");
    e.preventDefault();


    const id = localStorage.getItem("idToken");
    console.log(id);
    // Check if idToken is null or undefined before making the request
    if (id) {
      axios
        .put(
          "http://localhost:3001/updateDetails",
          { name: name,resume_link: res_link },
          {
            headers: {
              authorization: `${id}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data); // Logging the response data to console
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setDisable(false);
        });
    } else {
      console.error("idToken is null or undefined");
      setDisable(false);
    }

    setName("");
    setDisable(false);
  };

  return (
    <div className="add-form form-Padding">
      <div className="form-control">
        <label>Your Name: </label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <Upload handleUpload={handleUpload} saveBtn_State={setDisable}/>
      </div>
      <button onClick={onSubmit} value="Save Details" className="btn btn-block" disabled={Save_active}>Submit</button>
    </div>
  );
};

export default Register;
