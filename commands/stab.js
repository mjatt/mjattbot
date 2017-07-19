exports.run = (client, message, args) => {
  let victim = args.join(" ");
  message.reply(`stabbed ${victim}, rippo my gyppo`);
};
