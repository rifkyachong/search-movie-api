import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Home from "./Home";
import SearchMovie from "./SearchMovie";

// import NotFound from "./NotFound";

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/search" element={<SearchMovie />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
