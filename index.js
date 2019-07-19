require('dotenv').config();
var login = require('facebook-chat-api');
var fs = require('fs');

var answeredThreads = {};
var credentials = { email: process.env.EMAIL, password: process.env.PASSWORD };

// Create simple echo bot
login(credentials, function callback(err, api) {
  if (err) return console.error(err);
  fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
  api.listen(function callback(err, message) {
    api.getUserInfo(message.senderID, function(err, ret) {
      if (err) return console.error(err);
      for (var prop in ret) {
        if (ret.hasOwnProperty(prop) && ret[prop].name) {
          api.sendMessage(
            'BOT : Xin lỗi nha ' +
              ret[prop].name +
              ', Giờ mình đi ra ngoài rồi. Khi nào mình về, mình sẽ trả lời sau nhé !',
            prop,
            function() {
              answeredThreads[message.threadID] = true;
            },
          );
        }
      }
    });
  });
});
