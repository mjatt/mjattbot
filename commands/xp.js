const firebase = require("firebase");

exports.run = (client, message, args) => {
  firebase
    .database()
    .ref("/users/servers/" + message.guild.id + "/" + message.author.id)
    .once("value")
    .then(function(snapshot) {
      var data = snapshot.val();
      if (data) {
        var need = 100 - parseInt(data);
        message.channel.send(`${message.author.username} has ${data} xp. ${need} xp needed to level up!`);
      } else {
        message.channel.send(
          "Couldn't find your XP. Is levelling enabled on the server?"
        );
      }
    });
};
