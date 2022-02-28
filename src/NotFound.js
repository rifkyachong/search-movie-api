import React from "react";
import { Link, useParams } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const { path } = useParams();
  return (
    <>
      <h3 id="status-code">404</h3>
      <p id="status-msg">{`path: ${path} not found`}</p>
      <Link to="/">Back to task manager</Link>
    </>
  );
}
