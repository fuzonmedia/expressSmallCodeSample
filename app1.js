// Promise (bluebird) implementation - Array  - loop

var express = require('express');
var Promise = require('bluebird');
var lodash = require('lodash');
var app = express();
var async = require('async');

/**
 * Simulates database fetching the user for the specified ID (simulates REST API)
 *
 * @param {integer} id - User ID
 * @return {Promise<object>}
 */
 function getUser(id) {

   var users = {
     '42': {
       id: 42,
       name: 'Chandra Saini'
     },
     '8': {
       id: 8,
       name: 'Marut Kala'
     },
     '7': {
       id: 7,
       name: 'Awf Taheri'
     },
     '1': {
       id: 1,
       name: 'Shaamil Eid'
     },
     '99': {
       id: 99,
       name: 'Kumara Ganguly'
     }
   };
   return new Promise(function (resolve) {
     setTimeout(function () {
       resolve(users[String(id)]);
     }, lodash.random(1, 2000));
   });
 }

 ///////////////////////////////////////////////////////////////////////////////
 // API METHOD - DO NOT EDIT ABOVE THIS LINE (debug logging is OK)
 ///////////////////////////////////////////////////////////////////////////////

 /**
  * Looks up the list of IDs via the REST API
  * and returns them in the same order provided
  *
  * @param {array<string>} ids - Array of IDs in desired order
  * @return {Promise<array>}
  */
 function getUsersByIds(ids) {

   ////
   // YOUR CODE GOES HERE
   /////

  var output=[];

 return new Promise(function (resolve) {
  Promise.each(ids, function(id,index) {
    return getUser(id)
     .then(function(result){
       console.log(result);
        output.push(result);
     });
   })
   .then(function(rslt){
     //return  primary array in rslt
    //console.log(rslt);
    console.log(Date.now());
    resolve(output);
   });

   // TODO: your solution
 });
 }

app.get('/', function (req, res) {
  res.send('Hello World! App');
});

//
app.get('/users', function (req, res) {
  var testIds = [
    8, 99, 1, 7, 42
  ];
console.log(Date.now());
getUsersByIds(testIds)
.then(function(result){
res.send('Input : '+JSON.stringify(testIds) + '<br> Output :'+JSON.stringify(result));
});


});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
