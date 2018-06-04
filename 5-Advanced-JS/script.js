// Function Constructor

// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

// var Person = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;

// };

// Person.prototype.lastName = 'Smith';

// Person.prototype.calculateAge = function() {
//     console.log(2016 - this.yearOfBirth);
// };

// var john = new Person('John', 1990, 'teacher');
// john.calculateAge();

// var jane = new Person('Jane', 1969, 'designer');
// jane.calculateAge();

// var mark = new Person('mark', 1948, 'retired');
// mark.calculateAge();

// console.log(john.lastName);
// console.log(jane.lastName);
// console.log(mark.lastName);

// Object Create

// var personProto = {
//     calculateAge: function() {
//         console.log(2016 - this.yearOfBirth);
//     }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, 
//     {
//         name: { value: 'Jane' },
//         yearOfBirth: { value: 1969 },
//         job: { value: 'designer' }
//     }
// );

// Primitives VS Objects

// // Primitives
// // Primitive type hold the data in the variable itself 
// var a = 23;
// var b = a;
// a = 46;

// console.log(a);
// // 46
// console.log(b);
// // 23

// // Objects
// // Object type hold the reference to the object

// var obj1 = {
//     name: 'John',
//     age: 26
// }; 

// var obj2 = obj1;
// obj2.age = 38;

// console.log(obj1.age);
// // 30
// console.log(obj2.age);
// // 30

// // Functions
// var age = 27;
// var obj = {
//     name: 'Jonas',
//     city: 'Lisbon'
// };

// function change(a, b) {
//     a = 30;
//     b.city = 'San Francisco';
// }

// change(age, obj);

// console.log(age);
// console.log(obj.city);

//////////////////////////////
// Passing functions as Arguments

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn){
//     var arrRes = [];
//     for (var i = 0; i < arr.length; i+=1) {
//         arrRes.push(fn(arr[i]));
//     }
//     return arrRes;
// }

// function calculateAge(el) {
//     return 2016 - el;
// }

// function isFullAge(el) {
//     return el >= 18;
// }

// function maxHeartRate(el) {
//     if (el >= 18 && el <= 81) {
//         return Math.round( 206.9 - (0.67 * el ));
//     } else {
//         return -1;
//     }
    
// }

// var ages = arrayCalc(years, calculateAge);
// // (5) [26, 51, 79, 11, 18]
// var fullAges = arrayCalc(ages, isFullAge);
// // (5) [true, true, true, false, true]

// var rates = arrayCalc(ages, maxHeartRate);

// Functions returning functions

// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function(name) {
//             console.log(name + ', Can you please explain what UX design is ?');
//         }
//     }else if (job === 'teacher') {
//         return function(name) {
//             console.log('What subject do you teach, ' + name + ' ?');
//         }
//     } else {
//         return function(name) {
//             console.log('What do you do ?');
//         }
//     }
// }

// var teacherQuestion = interviewQuestion('teacher');
// teacherQuestion('John');
// var designerQuestion = interviewQuestion('designer');
// designerQuestion('Jane');

// interviewQuestion('designer')('Mark');

////////////////////////////////////////////////////////
// Lecture : IIFE (Imediately Invoked Function Expression)

// function game() {
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

// (function () {
//     var score = Math.random() * 10;
//     console.log(score >= 5);  
// })();

// (function (goodLuck) {
//     var score = Math.random() * 10;
//     console.log(score >= 5 - goodLuck);  
// })(5);


//////////////////////////////////////////////////////////
// Closures

// function retirement(retirementAge) {
//     var a = ' years left until retirement.';
//     return function(yearOfBirth) {
//         var age = 2016 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//     }
// }

// var retirementUS = retirement(66);
// retirementUS(1990);

// var retiredGermany = retirement(65);
// var retirementIceland = retirement(67);

// retiredGermany(1990);
// retirementUS(1990);
// retirementIceland(1990);

// retirement(66)(1990);

// function interviewQuestion(job) {
//     designerQuestion = ', Can you please explain what UX design is ?';
//     teacherQuestion = 'What subject do you teach, ';
//     otherQuestion = 'What do you do ?';

//     return function(name) {
//         if (job === 'designer') {
//             console.log(name + designerQuestion);
//         }else if (job === 'teacher') {
//             console.log(teacherQuestion + name + ' ?');
//         } else {
//             console.log(otherQuestion);
//         }
//     }
// }

// interviewQuestion('teacher')('John');

/////////////////////////////////////////////
// Lecture: Bind, call and apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        var speechText = '';
        if (style === 'formal') {
            speechText += 'Good ' + timeOfDay + ' Ladies and gentleman!';
          
        } else if (style === 'friendly') {
            speechText += 'Hey What\'s up ?';
        }
        speechText += ' I\'m ' + this.name;
        speechText += ' I\'m a ' + this.job;
        speechText += ' I\'m ' + this.age + ' years old';  
        console.log(speechText);
        
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

// call
john.presentation('formal', 'morning');
john.presentation.call(emily, 'friendly', 'afternoon');

// apply
// john.presentation.apply(emily, ['friendly', 'afternoon']); 
// method presentation has to handle an array

// bind
// preset certain arguments of the functions
// currying: create a function based on another function with preset arguments
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');