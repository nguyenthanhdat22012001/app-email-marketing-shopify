export  function formatdateYMD(dateString= '') {
  const dateObj = dateString !== "" ? new Date(dateString) : new Date();
  const yyyy = dateObj.getFullYear();
  let mm = dateObj.getMonth() + 1; // Months start at 0!
  let dd = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return `${yyyy}-${mm}-${dd}`;
}
