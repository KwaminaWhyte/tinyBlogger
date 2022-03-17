import React from "react";
import { Outlet } from "remix";

function Auth() {
  return (
    <div>
      <h1>Auth Page</h1>

      <Outlet />
    </div>
  );
}

export default Auth;
