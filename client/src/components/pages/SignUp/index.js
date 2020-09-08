import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import Navbar from "../../Navbar/index.js";


function SignUp() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  // Does a post to the signup route. If successful, we are redirected to the browse-game page
  // Otherwise we log any errors
  function signUpUser(e) {
    e.preventDefault();
    const bodyObj = {  
      userName: userName,
      email: email,
      password: password
    }
    console.log(bodyObj);
    axios.post("/api/signup", bodyObj)
      .then(res=> {
        console.log(res);
        if (!res.data.errmsg){
          console.log("success");
          history.push("/");
        } else {
          console.log("ERR");
        }})
      .catch(err=> {
        console.log("Signup Error: ");
        console.log(err);
      })
  }

  return (
    <div>
      <Navbar />
      <div className="loginCard">

        <div className="container">
          <div className="row">
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                placeholder="User Name"
                name="userName"
                onChange={e => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                placeholder="email"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={e => {setPassword(e.target.value)}}
              />
            </div>
          </div>
          <button onClick={signUpUser} className="btn btn-outline-dark" type="submit">
            Sign Up
          </button>
        </div>
      </div>
      <h3>Already a member?</h3> <Link to="/">Login</Link>
    </div>
  )
};

export default SignUp;