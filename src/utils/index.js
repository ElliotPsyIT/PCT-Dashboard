

export function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

export function delimitNumbers(str) {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  })
}

export function totalAndPercent(arr) {
  let group = arr.length != 0 ? addCommas(+arr[0].totalNum) : 0
  let percent = arr.length != 0 ? arr[0].PercentageCPT : 0
  return { 'total' : group, 'percent' : percent}
}

export function arrayEmpty(arr) {
  return arr.length == 0 ? true : false 
}

// helper for rounding to decimals
export function precise_round(num, dec){
 
  if ((typeof num !== 'number') || (typeof dec !== 'number')) 
return false; 

  var num_sign = num >= 0 ? 1 : -1;
    
  return (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
}

export const apiConfig = { path : 'pct.cgi' }

