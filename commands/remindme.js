exports.run = (client, message, args) => {
    if(args[0] == null) {
      message.channel.send(`Specify a length of time to remind you in minutes, e.g. 60`);
    } else if(args[1] == null) {
      message.channel.send(`Specify what I should remind you about`);
    } else if(isNaN(args[0])) {
      message.channel.send(`Invalid input, first argument should be a number`);
    } else {
      let value = args[0];
      let final = value * 60000;
      console.log(value);
      let remindText = args[1];
      message.reply(`I will remind you in ${value} minutes, "${remindText}"`);
      function timer() {
        setTimeout(function(){ message.reply(`${remindText}`); }, final);
      }
      timer();
    }
};