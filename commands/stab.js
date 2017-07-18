exports.run = (client, message, args) => {
  let victim = args.join(" ");
  message.reply(`stabbed ${victim}, rippo my gyppo`);
  console.log(
    `${message.author.username} just made me stab ${victim} in ${message.guild}`
  );
};
