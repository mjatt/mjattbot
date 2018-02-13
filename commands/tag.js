const firebase = require("firebase");

exports.run = (client, message, args) => {
  let tag = args[0];

  if (tag == null) {
    return message.channel.send(`You didn't specify a tag!`);
  }

  firebase
    .database()
    .ref(
      "/Tags/Servers/" +
        message.guild.id +
        "/" +
        message.author.id +
        "/" +
        tag.toLowerCase()
    )
    .once("value")
    .then(function(snapshot) {
      var data = snapshot.val();
      if (data) {
        message.channel.send(data);
      } else {
        message.channel.send(
          "Couldn't find that tag. Did you mean to +createtag?"
        );
      }
    });
};

exports.usage = '+tag [tagName]';
exports.helpMessage = 'Returns the content of the created tag';
