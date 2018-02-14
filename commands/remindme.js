const firebase = require("firebase");
const firebaseRef = firebase.database().ref();

exports.run = (client, message, args) => {
  var userId = message.author.id;
  var userGuild = message.guild.id;
  if (args[0] == null) {
    message.channel.send(
      `Specify a length of time to remind you in minutes, e.g. +remindme 60 brush my teeth`
    );
  } else if (args[1] == null) {
    message.channel.send(`Specify what I should remind you about`);
  } else if (isNaN(args[0])) {
    message.channel.send(
      `Invalid input, first argument should be a number in minutes`
    );
  } else {
    let value = args[0];
    let final = value * 60000;
    var original = args.slice(1);
    var finalText = original.join(" ");
    firebase
      .database()
      .ref("/reminders/servers/" + message.guild.id + "/" + message.author.id)
      .once("value")
      .then(function (snapshot) {
        var data = snapshot.val();
        if (data) {
          message.channel.send(
            `You can only have one reminder active at once! Use "+remindme cancel" to cancel your last reminder.`
          );
        } else {
          message.reply(
            `I will remind you in ${value} minutes, "${finalText}"`
          );
          firebaseRef
            .child("reminders")
            .child("servers")
            .child(userGuild)
            .child(userId)
            .set(value);
        }
      });

    function timer() {
      setTimeout(function timeoutFunction() {
        message.reply(`You asked me to remind you: "${finalText}"`);
        firebase
          .database()
          .ref(
            "/reminders/servers/" + message.guild.id + "/" + message.author.id
          )
          .once("value")
          .then(function (snapshot) {
            var wewe = snapshot.val();
            if (wewe) {
              firebaseRef
                .child("reminders")
                .child("servers")
                .child(userGuild)
                .child(userId)
                .remove();
            }
          });
      }, final);
    }
    timer();
  }
};

exports.usage = '+remindme [time in mins] [content]';
exports.helpMessage = 'Pings the user after the time allocated with the contet. If the bot goes offline, it will not save the reminder.';
