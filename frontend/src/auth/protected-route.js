
import React from "react";
import { Navigate } from "react-router-dom";

//a wraper on the normal "route" object. the main thing is that it says "withAuthetnicationRequired." if user "isAuthetnicated" only then can you go to this route
const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
export default ProtectedRoute;