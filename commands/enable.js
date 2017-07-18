var jsonfile = require("jsonfile");
var file = "./data/data.json";
exports.run = (client, message, args) => {
  if (!args[0]) {
    message.reply(`You haven't specified what to enable`);
  }
  if (args[0] === "welcome") {
    let obj = { id: message.guild.id, enableddisabled: "enabled" };
    jsonfile.writeFile(file, obj, { flag: "a" }, function(err) {
      console.error(err);
    });
  }
};
