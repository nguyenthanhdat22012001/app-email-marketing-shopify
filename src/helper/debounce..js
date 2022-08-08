export function debounce(fn, delay) {
  var timeoutID = null
  return function () {
    console.log(timeoutID)
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)      
    }, delay)

  }
}