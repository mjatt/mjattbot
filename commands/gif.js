var giphy = require("giphy-api")("e13de5d3adab4d05aae9d774b826a1ae");

exports.run = (client, message, args) => {
  console.log(`${message.author.username} just searched for a gif in ${message.guild}`)
  let gifName = args.join(" ");
  giphy.random(gifName, function(err, res) {
    if (res.data.url !== undefined) {
      message.channel.send(res.data.url);
      console.log(res.data.url);
    } else {
      message.channel.send(`Couldn't find a gif for ${gifName}`);
    }
  });
};
