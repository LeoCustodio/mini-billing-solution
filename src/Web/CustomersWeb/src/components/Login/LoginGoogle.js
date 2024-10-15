import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import { Navigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

function LoginGoogle() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

  return (
    <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}

export default LoginGoogle;