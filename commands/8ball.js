exports.run = (client, message, args) => {
  let x = message.content.split(" ").slice(1);
  if (x == "") { //checks to see if theres a question
    message.channel.send(`There's no question you speng`);
  } else {
  var answers = ['Definitely', 'Maybe', 'Yes', 'No', 'You wish', 'I hope not', 'Go find out', 'Hello?',
  'Probably not', 'Good joke', 'That question made me want to die']; //all the answers that could be picked
  var answer = answers[Math.floor(Math.random() * answers.length)]; //picks an answer by random
  message.channel.send(answer);
}