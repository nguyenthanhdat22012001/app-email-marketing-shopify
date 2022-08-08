export  function handlePercentByMath(total,number) {
    let percent = Math.floor((number / total) * 100);
    return percent ? `${percent}%` : `0%`;
  }
  