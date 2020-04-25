function displayCurrentYear(tagID) {
  return function() {
    const currentYear = new Date().getFullYear();
    const copyrightYear = document.getElementById(tagID);
    copyrightYear.textContent = currentYear;
  }
}

const tagID = 'copyright-year';
document.addEventListener('DOMContentLoaded', displayCurrentYear(tagID));