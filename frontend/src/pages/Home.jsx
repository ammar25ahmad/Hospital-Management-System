import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <h1>This is the Home page . You have to work on Admin Panel👇</h1>
      <Link
        className="border border-2 border-green-400 px-2 py-1 m-2"
        to="/admin"
      >
        Admin Panel
      </Link>
    </>
  );
}

export default Home;
