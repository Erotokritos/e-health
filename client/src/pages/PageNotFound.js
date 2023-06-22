import React from "react";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <h3>
        Go back to <Link to="/">Home</Link> Page
      </h3>
    </div>
  );
}

export default PageNotFound;
