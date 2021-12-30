function palindrome(str) {
    let palindrome = str.toLowerCase().replace(/_|,|\.|\s|-|\/|\(|\)/gi, "")
    let reversing = palindrome.split("").reverse().join("");
    return palindrome === reversing ? true : false;
  }
  
  console.log(palindrome("0_0 (: /-\ :) 0-0"))