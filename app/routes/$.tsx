import { Link } from "@remix-run/react";
import React from "react";

export default function NoMatch() {
  return (
    <>
      <p> Nothing to see here!</p>
      <Link to="/">Go to Homepage.</Link>
    </>
  );
}
