const firebase = require("firebase");

const firebaseRef = firebase.database().ref();
const firebaseUserRef = firebase.database().ref().child("Users");

exports.run = (client, message, args) => {
  firebaseRef.child("Users").child(message.author.username).set(10);
  message.reply(
    `Registered ${message.author.username} as ${message.author.username}`
  );
};
