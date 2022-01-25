
import "index.scss";
import displayCurrentYearInFooter from "./displayCurrentYearInFooter";

// TODO: Fix turbolinks not working
// import "turbolinks";
// document.addEventListener("turbolinks:load", () => {
//   this.addEventListener("DOMContentLoaded", displayCurrentYearInFooter());
// });

displayCurrentYearInFooter();

// Import all javascript files from src/_components
const componentsContext = require.context("bridgetownComponents", true, /.js$/);
componentsContext.keys().forEach(componentsContext);

console.info("Bridgetown is loaded!");
