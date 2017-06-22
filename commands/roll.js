exports.run = (client, message, args) => {
  var number = ["1", "2", "3", "4", "5", "6"];
  var answer = number[Math.floor(Math.random() * number.length)]; //picks a random number from the length of the array
  message.channel.send(answer);
  console.log(`${message.author.username} just rolled a dice`);
};
