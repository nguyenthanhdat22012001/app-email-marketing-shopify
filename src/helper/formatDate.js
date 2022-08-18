export  function formatdateYMD(dateString= '') {
  const dateObj = dateString !== "" ? new Date(dateString) : new Date();
  const yyyy = dateObj.getFullYear();
  let mm = dateObj.getMonth() + 1; // Months start at 0!
  let dd = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return `${yyyy}-${mm}-${dd}`;
}

export  function formatdateNameMonthDY(dateString= '') {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const dateObj = dateString !== "" ? new Date(dateString) : new Date();
  const yyyy = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth(); // Months start at 0!
  const monthName = months[monthIndex]
  let dd = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;

  return `${monthName} ${dd}, ${yyyy}`;
}
