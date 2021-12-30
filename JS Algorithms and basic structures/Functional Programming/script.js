// The global variable
const s = [23, 65, 98, 5];

Array.prototype.myMap = function(callback) {
  const newArray = [];
  // Only change code below this line
  // this refer pada s array alias pemilik (owner)
  for (let i = 0; i < this.length; i++) {
      //panggil function ya 
    newArray.push(callback(this[i]))
  }
  // Only change code above this line
  return newArray;
};

const new_s = s.myMap(function(item) {
  return item * 2;
});

const users = [
    { name: 'John', age: 34 },
    { name: 'Amy', age: 20 },
    { name: 'camperCat', age: 10 }
  ];
  
  const usersObj = users.reduce((obj, user) => {
    obj[user.name] = user.age;
    return obj;
  }, {});
  console.log(usersObj);