exports.run = (client, message, args) => {
  console.log(
    `${message.author.username} got their love in ${message.guild}`
  );
  let lover = args.join(" ");
  var answer = Math.floor(Math.random() * 100 + 1); //picks a number between 1-100 to see how much someone loves someone

  message.channel.send(
    `There is ${answer} % love between ${message.author} and ${lover}`
  );
};