var convert = require(`convert-units`);
exports.run = (client, message, args) => {
  try {
    message.channel.send(convert(args[0]).from(args[1]).to(args[2]) + args[2]);
  } catch (err) {
    message.channel.send(`Error! ${err.message}`);
  }
};

exports.usage = '+convert [number] [startingMeasurement] [finalMeasurement]';
exports.helpMessage = 'Convert a value into another value.';