exports.run = (client, message, args) => {
  let args = message.content.split(" ").slice(1);
  let lover = args[0];
  let second = args[1];
  var answer = Math.floor(Math.random() * 100 + 1); //picks a number between 1-100 to see how much someone loves someone
  if (second == null) {
    message.channel.send(
      `There is ${answer} % love between ${message.author} and ${lover}`
    );
    console.log(
      `${message.author.username} got their love in ${message.guild}`
    );
  } else {
    message.channel.send(
      `There is ${answer} % love between ${message.author} and ${lover} ${second}`
    );
    console.log(
      `${message.author.username} got their love in ${message.guild}`
    );
  }
};
