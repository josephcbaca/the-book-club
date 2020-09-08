import React, {useState, useEffect} from "react";
import "./App.css";
import { Route } from 'react-router-dom';
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Search from "./components/pages/Search";
import axios from "axios";


const App = () =>{

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const getUser = () => {
    axios.get("/api/user_data").then(res=> {
      if (res.data.user) {
        console.log("logged in");
        setLoggedIn(true);
        setCurrentUser(res.data.user);
      } else {
        console.log("Not logged in");
        setLoggedIn(false);
        setCurrentUser(null);
      }
    })
  }

  const updateUser = userObj=>{
    setLoggedIn(true);
    setCurrentUser(userObj);
  }

  useEffect(getUser, []);

  return(
    <div>
      <Route exact path="/" render={()=> <Login updateUser={updateUser} />} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/search" render={()=> <Search loggedIn={loggedIn} currentUser = {currentUser} />}/>
    </div>
    );
}

export default App;

