exports.run = (client, message, args) => {
  message.channel.send(
    `v0.5: The latest update was 09 May 2017, view the details here: http://mtaggart.uk/discord.html`
  ); //just the version of the bot thats currently out
  console.log(
    `${message.author.username} just viewed the latest update date in ${message.guild}`
  );
};
