import React from "react";
import { useSelector } from "react-redux"

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => ({...state}))
    console.log('UseRoute',user)
 //check user login 
  
    return user && user.user.token 
    ? children 
    : <h1>No user Login</h1>


};

export default UserRoute;
