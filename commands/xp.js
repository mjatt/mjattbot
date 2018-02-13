const firebase = require("firebase");

exports.run = (client, message, args) => {
  if (!message.mentions.users.first()) {
    firebase
      .database()
      .ref("/users/servers/" + message.guild.id + "/" + message.author.id)
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if (data) {
          var need = 100 - parseInt(data);
          message.channel.send(
            `${message.author.username} has ${data} xp. ${need} xp needed to level up!`
          );
        } else {
          message.channel.send(
            "Couldn't find your XP. Is levelling enabled on the server?"
          );
        }
      });
  } else {
    firebase
      .database()
      .ref(
        "/users/servers/" +
          message.guild.id +
          "/" +
          message.mentions.users.first().id
      )
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if (data) {
          message.channel.send(
            `${message.mentions.users.first().username} has ${data} xp.`
          );
        } else {
          message.channel.send(
            `Couldn't find ${message.mentions.users.first().username}'s XP. Is levelling enabled on the server?`
          );
        }
      });
  }
};
