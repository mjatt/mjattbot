exports.run = client => {
  let launch = new Date();
  console.log(`Client launched at ${launch}`);
  client.user.setActivity(`+help`);
};
