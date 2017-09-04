const firebase = require("firebase");

exports.run = (client, message, args) => {
  let tag = args[0];

  if (!tag) return console.warn("no tag specified using tag command in " + message.guild.name);

  firebase
    .database()
    .ref("/Tags/servers/" + message.guild.id + "/" + tag)
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
