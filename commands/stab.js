exports.run = (client, message, args) => {
  let args = message.content.split(" ").slice(1);
  let victim = args[0];
  message.reply(`stabbed ${victim}, rippo my gyppo`);
};