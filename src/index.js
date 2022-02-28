import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

// import NotFound from "./NotFound";

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<TaskManager />} />
      <Route path="/task/:id" element={<TaskEdit />} />
      <Route path="/:path" element={<NotFound />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
