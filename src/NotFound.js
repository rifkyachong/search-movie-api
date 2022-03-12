import axios from "axios";
import React, { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  useEffect(async () => {
    try {
      const data = await axios.get("/asdasd");
      console.log(data);
    } catch (error) {
      console.log("error is called");
      console.log(error);
    }
  });

  return <>Not Found</>;
}
