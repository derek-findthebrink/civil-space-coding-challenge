// Libraries
import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <>
    <h1>Welcome!</h1>
    <div>
      <Link to="/articles">View Articles</Link>
    </div>
  </>
);

export default Home;
