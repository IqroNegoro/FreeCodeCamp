// OOP JS freecodecamp
// Chaining Type
// Nenek > Orang Tua > Anak
// Hewan > Burung, anjing, kucing > Nama Hewannya
// Create Supertype (ancestor alias sepuh atau tertinggi dari object prototype)

// Create Constructor Object biar working
function Animal() {}

//prototype dijadikan object agar tidak ribet atau kebanyakan line code
Animal.prototype = {
    //define constructor prototype dulu
    //semua Object punya prototype ya jadi kita inherit prototype
    constructor: Animal,
    eat() {
        console.log(voice)
    },

    describe() {
        console.log("Aku " + this.nama)
    }
}

//Create MixIn, function yg bikin ability wakakaka
let running = obj => {
    obj.run = function() {
        console.log("RUNN!!")
    }
}

// Create Constructor Bird
function Bird(nama) {
    this.nama = nama;
}

// Create Prototype object bird tapi di inherit dari Animal
Bird.prototype = Object.create(Animal.prototype)
Bird.prototype.constructor = Bird;
//Bikin unique behavior alias property sendiri
Bird.prototype.fly = function() {console.log("I am Flying!")}
let kukur = new Bird("Kukur")

function Dog(nama) {
    this.nama = nama;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
let bleky = new Dog("Bleky")

// Mixin bleky alias passing
running(bleky)

// Create Motion package Lost saga
let moveModule = (function() {
    return {
        salto: function(obj) {
            obj.salto = function() {
                console.log("//Salto h3h3")
            }
        },

        jugling: function(obj) {
            obj.jugling = function() {
                console.log("Nge jugling~")
            }
        }
    }
})()