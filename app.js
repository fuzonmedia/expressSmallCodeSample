var express = require('express');
var Promise = require('bluebird');
var lodash = require('lodash');
var app = express();
var async = require('async');

/**
 * Simulates database fetching the user for the specified ID (simulates REST API)
 *
 * @param {integer} id - A user ID
 * @param {function} callback - CPS callback to invoked with error, if any, and result as second argument
 */
var getUser = function(id, callback) {

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
  setTimeout(function () {
    callback(null, users[String(id)]);
  }, lodash.random(1, 2000));
}

///////////////////////////////////////////////////////////////////////////////
// API METHOD - DO NOT EDIT ABOVE THIS LINE (debug logging is OK)
///////////////////////////////////////////////////////////////////////////////

/**
 * Looks up the list of IDs via the REST API
 * and returns them in the same order provided
 *
 * @param {array} ids - Array of IDs in desired order
 * @param {function} callback - CPS callback you should invoke with the result
 *                            first arugment should be error (if any) and
 *                            second argument is the result
 */
var getUsersByIds = function(ids, callback) {

  ////
  // YOUR CODE GOES HERE
  ///
  var output=Array(ids.length);
  //console.log(output);
  async.forEach(ids,function(id,callback1){
    getUser(id,function(err,result){
      if(!err){
      output[ids.indexOf(id)]=result;
      return callback1();
      }
    });
  }, function(err) {
      //final callback from the function , when all async end
    //  console.log(output);
      callback(null,output);
  });
  // TODO: your solution
}


app.get('/', function (req, res) {
  res.send('Hello World! App');
});

//
app.get('/users', function (req, res) {
  var testIds = [
    99, 8, 1, 7, 42
  ];

  getUsersByIds(testIds,function(err,result){
      if(!err){
    res.send('Input : '+JSON.stringify(testIds) + '<br> Output :'+JSON.stringify(result));
  }
  });

});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
