// MessageScheduler.js
'use strict';
var request = require('request');
var Promise = require('bluebird');

class MessageScheduler {
  scheduleMessage(messageToSend, delay) {
    var promisifiedPostRequest = Promise.promisify(request.post);
    return promisifiedPostRequest(
      'http://localhost:8080/demo/message/queue1?type=queue', 
      {
        form: {
          body: JSON.stringify(messageToSend),
          AMQ_SCHEDULED_DELAY: delay
        }
      }
    )
    .then(function(response) {
      return response.headers.messageid;
    });
  }
}

module.exports = new MessageScheduler();