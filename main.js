// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
//console.log(valid1.length)

//Part 3:
const validateCred = (array) => {
  let sum = 0;
  let newArray = [];
  for(let i=0; i < array.length; i++) {
    let value = 0;
    if (i % 2 === 0) {
      value = array[i] * 2;
      if (value > 9) {
      value -= 9;
      }
    } else {
     value = array[i];
    } newArray.push(value);
    sum += value;
  } return sum % 10 === 0 && array.length === 16;
}


//Part 4:
const findInvalidCards = (array) => {
let invalidArray = [];
for (let i = 0; i < array.length; i++) {
  if(validateCred(array[i]) === false) {
    invalidArray.push(array[i]);    
  }
} return invalidArray;
}

//Part 5:
const invalidCards = findInvalidCards(batch); // array of invalid cards from the given batch.

const idInvalidCardCompanies = (array) => {
  let companies = [];
  for(let i=0; i < array.length; i++) {
    switch (array[i][0]) {
      case 3:
      if (companies.indexOf('Amex') === -1) {
        companies.push('Amex');
      }
      break;
      case 4:
      if (companies.indexOf('Visa') === -1) {
        companies.push('Visa');
      }
      break;
      case 5:
      if (companies.indexOf('MasterCard') === -1) {
        companies.push('MasterCard');
      }
      break;
      case 6:
      if (companies.indexOf('Discover') === -1) {
        companies.push('Discover');
      }
    }
  } return companies;
}

//console.log(idInvalidCardCompanies(invalidCards)); //displays companies that gave away invalid Cards.


//Part 7:

/* The cardnumberArray below is composed of random numbers taken from wikipedia */
let wikiBatch = [431678720795, 4539192113061347946, 6011567560619688, 5551255368405776, 6304437467358028]

//function below takes a batch of serial numbers as input and returns batch of arrays.
const serialsDivider = (array) => {
  let newArray = [];
for (let i= 0; i < array.length; i++) {
let num = array[i];
let digits = [];
while (num > 0) {
    digits.push(num % 10);
    num = parseInt(num / 10);    
}   digits.reverse();
    newArray.push(digits);
}   return newArray; 
}

let newBatch = serialsDivider(wikiBatch);
//console.log(newBatch);

//repairCred function is used to repair arrays and make them valid.
const repairCred = (array) => {
if (array.length > 16) {
   while (array.length > 16) {
    array.pop();
}
} else if (array.length < 16) {
  while (array.length < 16) {
    array.push(Math.floor(Math.random() * 10));
}
}
  array[array.length-1] = 0;
  let sum = 0;
  let newArray = [];
  for(let i=0; i < array.length; i++) {
    let value = 0;
    if (i % 2 === 0) {
      value = array[i] * 2;
      if (value > 9) {
      value -= 9;
      }
    } else if (i % 2 !== 0) {
     value = array[i];
    }  newArray.push(value);
      sum += value;
  } 
  let remainder = sum % 10;
  let modifier;
  if(remainder === 10) {
    modifier = 0;
  } else {
    modifier = 10 - remainder;
  }
  array[array.length-1] += modifier;
  return array;
} 

//repairBatch is used to directly repair an entire batch of invalid arrays.
const repairBatch = (batch) => {
  let newArray;
  for (let i = 0; i < batch.length; i++) {
batch[i] = repairCred(batch[i]);
  } return batch;
}

console.log(newBatch);
console.log('-------after repair batch outputs:-------');
repairBatch(newBatch);
console.log(newBatch);

