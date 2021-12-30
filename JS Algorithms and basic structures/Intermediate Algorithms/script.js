//Pig Latin
function translatePigLatin(str) {
    let regexp = /[aiueo]/gi
    let search = str.search(regexp);
    if (search === 0) {
      return str + "way"
    } else {
      if (search >= 0) {
        return str.slice(search) + str.slice(0, search) + "ay";
      } else {
        return str + "ay"
      }
    }
  }
  
  console.log(translatePigLatin("consonant"));
  console.log(translatePigLatin("california"));
  console.log(translatePigLatin("glove"));
  console.log(translatePigLatin("algorithm"));
  console.log(translatePigLatin("rhythm"));

// Search and replace
function myReplace(str, before, after) {
    if (before.charAt(0) === before.charAt(0).toUpperCase()) {
      return str.replace(before, after.charAt(0).toUpperCase() + after.slice(1))
    } else {
      return str.replace(before, after.charAt(0).toLowerCase() + after.slice(1))
    }
  }
  
  myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");