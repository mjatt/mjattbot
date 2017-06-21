var xkcd = require('xkcd');
exports.run = (client, message, args) => {

  xkcd(function (data) {
  message.channel.send(data.img);
});
}