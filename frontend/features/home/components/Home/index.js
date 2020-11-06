// Libraries
import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="test">
    Welcome!
    <div>
      <Link to="/articles">View Articles</Link>
    </div>
  </div>
);

export default Home;
