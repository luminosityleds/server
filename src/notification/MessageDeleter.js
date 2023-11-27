// MessageDeleter.js
'use strict';
var Stomp = require('stomp-client');
var Promise = require('bluebird');
var request = require('request');

var MessageDeleter = function MessageDeleter(messageID){
  var promisifiedPostRequest = Promise.promisify(request.post);
  return promisifiedPostRequest(
    'http://localhost:8080/demo/message/ActiveMQ.Scheduler.Management?type=topic', 
    {
      form: {
        AMQ_SCHEDULER_ACTION : 'REMOVE',
        scheduledJobId : scheduledJobId
      }
    }
  ).then(function(response){
    // Do any post-deletion processes you need to here
    return response;
  });
};

module.exports = MessageDeleter;