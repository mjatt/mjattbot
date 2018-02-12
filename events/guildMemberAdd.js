const Discord = require("discord.js");
const firebase = require("firebase");

exports.run = (client, member) => {
  if (member.guild.id === "181839332313792518") {
    const firebaseRef = firebase.database().ref();
    var cards = ["big congon", "big truck", "big dikke", "weiner", "kenne"];
    let card1 = cards[Math.floor(Math.random() * cards.length)];
    let card2 = cards[Math.floor(Math.random() * cards.length)];
    let card3 = cards[Math.floor(Math.random() * cards.length)];
    firebaseRef
      .child("iveaghRP")
      .child(member.user.id)
      .child("card1")
      .set(card1);
    firebaseRef
      .child("iveaghRP")
      .child(member.user.id)
      .child("card2")
      .set(card2);
    firebaseRef
      .child("iveaghRP")
      .child(member.user.id)
      .child("card3")
      .set(card3);
    member.send(
      `Welcome to Iveagh! Keep note of these cards, they will be used for RP. ${card1}, ${card2}, ${card3}`
    );
  }
  let channel = member.guild.channels.find("name", `welcome`);
  if (channel == null) return;
  firebase
    .database()
    .ref("/welcome/servers/" + member.guild.id + "/message")
    .once("value")
    .then(function(snapshot) {
      var data = snapshot.val();
      if (data) {
        if (data.includes(`$user`)) {
          var weiner = data.replace(`$user`, `<@${member.id}>`);
          channel.send(weiner);
        } else {
          channel.send(data);
        }
      } else {
        return;
      }
    });
};
