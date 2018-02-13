exports.run = (client, message, args) => {
  if (args[0] == null) {
    //checks to see if theres a question
    message.channel.send(`There's no question you speng`);
  } else {
    var answers = [
      "Definitely",
      "Maybe",
      "Your partner is cheating on you",
      "How could this happen to me? I've made my mistakes",
      "Yes",
      "No",
      "You wish",
      "I hope not",
      "Hello?",
      "Probably not",
      "Good joke",
      "That question made me want to die"
    ]; //all the answers that could be picked
    var answer = answers[Math.floor(Math.random() * answers.length)]; //picks an answer by random
    message.channel.send(answer);
  }
};

exports.usage = '+8ball [question]';
exports.helpMessage = 'Gives you a random response to your query.';
