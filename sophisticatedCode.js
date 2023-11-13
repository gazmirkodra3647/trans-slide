/* 
Filename: sophisticatedCode.js
Description: A complex JavaScript code that demonstrates various advanced concepts and techniques.
*/

//-----------------------
// Helper Functions
//-----------------------

/**
 * Function to calculate the factorial of a number using recursion.
 * @param {number} n - The number to calculate the factorial for.
 * @returns {number} - The factorial of the given number.
 */
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  
  return n * factorial(n - 1);
}

/**
 * Function to generate a random number between a given range.
 * @param {number} min - The minimum range value.
 * @param {number} max - The maximum range value.
 * @returns {number} - A random number between the given range.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//------------------------
// Main Implementation
//-----------------------

// Generate an array of random numbers
const arr = [];
for (let i = 0; i < 100; i++) {
  arr.push(getRandomNumber(1, 100));
}

// Sort the array in ascending order
arr.sort((a, b) => a - b);

// Calculate and print the factorial of each element in the array
for (let i = 0; i < arr.length; i++) {
  console.log(`Factorial of ${arr[i]} is ${factorial(arr[i])}`);
}

// Calculate the sum of all even numbers in the array
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    sum += arr[i];
  }
}

console.log(`Sum of all even numbers: ${sum}`);

// Create an object to store prime numbers in the array
const primeNumbers = {};
for (let i = 0; i < arr.length; i++) {
  let isPrime = true;
  for (let j = 2; j < arr[i]; j++) {
    if (arr[i] % j === 0) {
      isPrime = false;
      break;
    }
  }
  
  if (isPrime) {
    primeNumbers[arr[i]] = true;
  }
}

console.log('Prime numbers in the array:', primeNumbers);

// Perform a complex operation on each element of the array
const complexResult = arr.map((num) => {
  let result = num;
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      result += i;
    }
  }
  
  return result;
});

console.log('Complex operation result:', complexResult);

// Generate a random string from the array of numbers
let randomString = '';
for (let i = 0; i < arr.length; i++) {
  randomString += String.fromCharCode(arr[i]);
}

console.log('Random string:', randomString);

// Implement a custom sorting algorithm to sort the array in descending order
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] < arr[j]) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}

console.log('Sorted array in descending order:', arr);

// Calculate the average of all odd numbers in the array
let oddCount = 0;
let oddSum = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 !== 0) {
    oddCount++;
    oddSum += arr[i];
  }
}

const oddAverage = oddSum / oddCount;
console.log(`Average of all odd numbers: ${oddAverage}`);

// Generate a formatted date string
const now = new Date();
const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

console.log('Formatted date:', formattedDate);

// ... Continue with more complex logic as needed

//-----------------------------
// End of sophisticatedCode.js
//-----------------------------