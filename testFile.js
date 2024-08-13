// console.log("line 1");
// console.log("line 2");
// setTimeout(() => {
//   console.log("line 3");
// }, 100);
// console.log("line 4");

// asynchronous function

// callback functions

// async await

// .then().catch()

// A promise

const promise = new Promise((resolve, reject) => {
  return resolve("resolved successfully");
  // setTimeout(() => {
  //   throw new Error("error message");
  // }, 2000);
});

promise.then((data) => console.log(data)).catch((err) => console.log(err));

const operationComplete = (timeout) => {};

operationComplete(2000).then((message) => console.log(message));
// Output (after 2 seconds): "Operation Complete"
