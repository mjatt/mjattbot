exports.run = (client, message, args) => {
  let args = message.content.split(" ").slice(1);
  let victim = args[0];
  message.reply(`stabbed ${victim}, rippo my gyppo`);
  console.log(
    `${message.author.username} just made me stab ${victim} in ${message.guild}`
  );
};
