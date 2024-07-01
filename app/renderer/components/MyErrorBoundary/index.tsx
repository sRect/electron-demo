import React from "react";
import {useRouteError, isRouteErrorResponse, Link} from "react-router-dom";

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>error page!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return (
      <>
        <h1>error page!</h1>
        <Link to="/">回到首页</Link>
      </>
    )
  }
}

export default ErrorBoundary;
