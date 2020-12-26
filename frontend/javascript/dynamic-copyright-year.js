function displayCurrentYear() {
  const tagID = "copyright-year";
  const copyrightYear = document.getElementById(tagID);
  const currentYear = new Date().getFullYear();

  copyrightYear.textContent = currentYear;
}

document.addEventListener("turbolinks:load", function() {
  this.addEventListener("DOMContentLoaded", displayCurrentYear());
});