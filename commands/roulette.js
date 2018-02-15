const firebase = require("firebase");

const firebaseRef = firebase.database().ref();

exports.run = (client, message, args) => {
  var redblack = ["red", "black"];

  if (args[0] === "register") {
    var filter = m =>
      m.content.startsWith(`Yes`) || m.content.startsWith(`yes`);
    message.channel.send(
      "Are you sure you want to register? This will set your balance to 10. Reply `Yes` to continue."
    );
    message.channel
      .awaitMessages(filter, {
        max: 1,
        time: 30000,
        errors: ["time"]
      })
      .then(function(collected) {
        var x = collected.first().author.username;
        if (x !== message.author.username) return;
        firebaseRef
          .child("Users")
          .child("Servers")
          .child(message.guild.id)
          .child(message.author.id)
          .set(10);
        message.channel.send(`Registered for roulette. Your balance is 10`);
      })
      .catch(collected => message.channel.send(`Registration cancelled.`));
  } else if (args[0] === "balance") {
    let person = message.mentions.users.first();
    if (person) {
      firebase
        .database()
        .ref("/Users/Servers/" + message.guild.id + "/" + person.id)
        .once("value")
        .then(function(snapshot) {
          var data = snapshot.val();
          if (data) {
            message.channel.send(`${person.username}'s balance is $${data}.`);
          } else {
            message.channel.send(
              `Couldn't find a balance for ${person.username}`
            );
          }
        });
    } else {
      firebase
        .database()
        .ref("/Users/Servers/" + message.guild.id + "/" + message.author.id)
        .once("value")
        .then(function(snapshot) {
          var data = snapshot.val();
          if (data) {
            message.channel.send(
              `${message.author.username}, your balance is $${data}.`
            );
          } else {
            message.channel.send(
              `Couldn't find your balance. Do you have money? Have you registered using +roulette register?`
            );
          }
        });
    }
  } else if ((!isNaN(args[0]) && args[1] === "red") || args[1] === "black") {
    firebase
      .database()
      .ref("/Users/Servers/" + message.guild.id + "/" + message.author.id)
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if (data) {
          if (args[0] > data) {
            message.reply(
              `You don't have enough money to do that! Your balance is ${data}`
            );
          } else {
            var result = redblack[Math.floor(Math.random() * redblack.length)];
            if (result === args[1]) {
              let bet = parseInt(args[0]);
              var winning = Math.round(bet * 1.45);
              var total = winning + data;
              message.channel.send(
                `The result is... ${result}. You won $${winning}! Your balance is $${total}.`
              );
              firebaseRef
                .child("Users")
                .child("Servers")
                .child(message.guild.id)
                .child(message.author.id)
                .set(data + winning);
            } else if (result !== args[1]) {
              let total = data - args[0];
              message.channel.send(
                `The result is... ${result}. You lost $${args[0]}! Your balance is $${total}`
              );
              firebaseRef
                .child("Users")
                .child("Servers")
                .child(message.guild.id)
                .child(message.author.id)
                .set(total);
              if (total === 0) {
                message.channel.send(
                  `Looks like you're broke now, ${message.author.username}. You'd better re-register.`
                );
              }
            }
          }
        } else {
          message.channel.send(
            "You don't have any money! Have you run +roulette register?"
          );
        }
      });
  } else if (!isNaN(args[0]) && !isNaN(args[1])) {
    if (args[1] > 38) {
      message.channel.send(`The roulette table only goes up to 38.`);
      return;
    }
    firebase
      .database()
      .ref("/Users/Servers/" + message.guild.id + "/" + message.author.id)
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if (data) {
          if (args[0] > data) {
            message.reply(
              `You don't have enough money to do that! Your balance is ${data}`
            );
          } else {
            var result = Math.floor(Math.random() * 38 + 1);
            if (result === args[1]) {
              let bet = parseInt(args[0]);
              var winning = Math.round(bet * 5);
              var total = winning + data;
              message.channel.send(
                `The result is... ${result}. You won $${winning}! Your balance is $${total}.`
              );
              firebaseRef
                .child("Users")
                .child("Servers")
                .child(message.guild.id)
                .child(message.author.id)
                .set(data + winning);
            } else if (result !== args[1]) {
              let total = data - args[0];
              message.channel.send(
                `The result is... ${result}. You lost $${args[0]}! Your balance is $${total}`
              );
              firebaseRef
                .child("Users")
                .child("Servers")
                .child(message.guild.id)
                .child(message.author.id)
                .set(total);
              if (total === 0) {
                message.channel.send(
                  `Looks like you're broke now, ${message.author.username}. You'd better re-register.`
                );
              }
            }
          }
        } else {
          message.channel.send(
            "You don't have any money! Have you run +roulette register?"
          );
        }
      });
  } else if (args[0] === "send") {
    let recipient = message.mentions.users.first();
    firebase
      .database()
      .ref("/Users/Servers/" + message.guild.id + "/" + message.author.id)
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if (args[2] > data) {
          message.reply(
            `You don't have that much to give away! Your balance is ${data}.`
          );
        } else if (!recipient) {
          message.reply(`You haven't mentioned who you want to send money to.`);
        } else if (isNaN(args[2])) {
          message.channel.send(`Use +roulette send @user 10`);
        } else {
          firebase
            .database()
            .ref("/Users/Servers/" + message.guild.id + "/" + recipient.id)
            .once("value")
            .then(function(snapshot) {
              var recdata = snapshot.val();
              firebaseRef
                .child("Users")
                .child("Servers")
                .child(message.guild.id)
                .child(recipient.id)
                .set(recdata + +args[2]);
              firebaseRef
                .child("Users")
                .child("Servers")
                .child(message.guild.id)
                .child(message.author.id)
                .set(data - args[2]);
            });
        }
      });
  } else if (args[0] === "russian") {
    var result = Math.floor(Math.random() * 6);
    if ((result === 1)) {
      message.channel.send(`It's a ${result}. Goodbye ${message.author.username}.`);
      message.guild.member(message.author).kick();
    } else {
      message.channel.send(
        `You got lucky, ${message.author.username}. it was ${result}.`
      );
    }
  } else {
    message.reply(
      `Ensure that you have used "+roulette register" before you bet! Then bet on either red/black or the number 1-38.`
    );
  }
};

exports.usage = '+roulette [register|amount to bet] [red|black|number 1-38]';
exports.helpMessage = 'Gamble your points away. Must use register first.';