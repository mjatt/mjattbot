exports.run = (client, message, args) => {
  let args = message.content.split(" ").slice(1);
  let waifu = args[0];
  var answer = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  var rating = answer[Math.floor(Math.random() * answer.length)];

  message.channel.send(`${waifu} is a ${rating}/10 waifu`);
  console.log(
    `${message.author.username} just found out how good ${waifu} is in ${message.guild}`
  );
};
