const firebase = require("firebase");

exports.run = (client, message, args) => {
  let tag = args[0];

  if (tag == null) {
    return message.channel.send(`You didn't specify a tag!`);
  }

  var firebaseNewRef = firebase
    .database()
    .ref()
    .child("Tags")
    .child("servers")
    .child(message.guild.id)
    .child(tag);

  firebaseNewRef.on("value", gotData, errData);

  function gotData(data) {
    console.log(data);
    if(data.value_ == null) {
      return message.reply(`nop`);
    }
    message.channel.send(data.val());
  }

  function errData(err) {
    console.log(err);
  }
};
