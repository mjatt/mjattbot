exports.run = (client, message, args) => {
  message.reply("Slide into your DMs like");
  message.author.send(
    `Follow this link to find out everything that I can do: http://www.mtaggart.uk/commands.html`
  );
  console.log(`${message.author.username} got help in ${message.guild}`);
};
