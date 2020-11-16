/* eslint-disable react/jsx-props-no-spreading */
// Libraries
import React from "react";
import { render } from "react-dom";

import { App } from '../components/App'

const rootElement = document.querySelector("#react-app");

render(<App />, rootElement);

export default App;
