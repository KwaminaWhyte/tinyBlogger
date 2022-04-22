import React from "react";
import { Link } from "@remix-run/react";

function Login() {
  return (
    <div>
      <h1>Login Page</h1>

      <Link to="/auth/register">You Don't have an Account?</Link>
    </div>
  );
}

export default Login;
