const displayCurrentYearInFooter = () => {
  const tagID = "copyright-year";
  const copyrightYear = document.getElementById(tagID);
  const currentYear = new Date().getFullYear();

  copyrightYear.textContent = currentYear;
}


export default displayCurrentYearInFooter;