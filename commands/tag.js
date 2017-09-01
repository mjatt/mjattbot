const firebase = require("firebase");

exports.run = (client, message, args) => {
  let tag = args[0];

  const firebaseRef = firebase.database().ref();
  var firebaseNewRef = firebase
    .database()
    .ref()
    .child("Tags")
    .child("servers")
    .child(message.guild.id)
    .child(tag);

  firebaseNewRef.on("value", gotData, errData);

  function gotData(data) {
    message.channel.send(data.val());
  }

  function errData(err) {
    console.log(err);
  }
};
