exports.run = (client, message, args) => {
  if (args[0] == null) {
    message.channel.send(`You haven't specified anyone to stab!`);
  } else {
    let victim = args.join(" ");
    var number = ["1", "2"];
    var answer = number[Math.floor(Math.random() * number.length)];
    if (answer === "1") {
      message.reply(`stabbed ${victim}, rippo my gyppo`);
    } else if (answer === "2") {
      message.reply(`You messed up and stabbed yourself.`);
    }
  }
};
