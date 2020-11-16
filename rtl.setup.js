/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// TODO: move this into the frontend folder
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import fetch from "cross-fetch";

// TODO: uncomment this block
// force error on console.error
// const consoleErrorOriginal = console.error; // eslint-disable-line no-console
// console.error = (error) => {
//   // eslint-disable-line no-console
//   consoleErrorOriginal(error);
//   throw error;
// };

global.fetch = fetch;
