import React from "react";
import PropTypes from "prop-types";

export const Layout = ({ children }) => (
  <main>
    <div className="layout__accent-bar" />
    {children}
  </main>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
