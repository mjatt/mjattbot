exports.run = (client, message, args) => {
  let waifu = args.join(" ");
  var answer = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  var rating = answer[Math.floor(Math.random() * answer.length)];

  message.channel.send(`${waifu} is a ${rating}/10 waifu`);
};
