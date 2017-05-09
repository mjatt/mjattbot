const Discord = require("discord.js"); //allows discordjs to work
const client = new Discord.Client(); //initiates the bot
const yt = require('ytdl-core'); //allows for youtube integration
const key = require("./config.json"); //contains the prefix and bot token
const firebase = require("firebase");

var config = {
    apiKey: "AIzaSyASYCAs0rJL8eFaJMnd8h9sOZST_H2-j24",
    authDomain: "mjattbot.firebaseapp.com",
    databaseURL: "https://mjattbot.firebaseio.com",
    projectId: "mjattbot",
    storageBucket: "mjattbot.appspot.com",
    messagingSenderId: "688773779333"
  };

client.on("ready", () => {
  let launch = new Date();
  console.log(`Client launched at ${launch}`); //starts the bot
  client.user.setGame(`+help | Servers: ${client.guilds.size}`)
});

firebase.initializeApp(config);

const firebaseRef = firebase.database().ref();
const firebaseUserRef = firebase.database().ref().child("Users");

client.on("guildMemberAdd", member => { //if a new user joins
  let guild = member.guild; //gets the server that the member joined
  guild.defaultChannel.sendMessage(`Welcome to ${member.guild.name}+ " " + ${member.user}`) //sends message to default channel of the server
  console.log(`${member.user} just joined ${member.guild.name}`);
});

client.on("message", message => { //if someone sends a message
  if(message.author.bot) return; //if a message is sent from a bot, do nothing
  if(!message.content.startsWith(key.prefix)) return; //if a message doesnt start with the prefix, do nothing

  let command = message.content.split(" ")[0]; //splits the message to read different arguments from the user
  command = command.slice(key.prefix.length); //command is the word connected to the prefix

  let args = message.content.split(" ").slice(1); //the second word from the users command is stored

  if(command==="invite") {
    message.channel.sendMessage(`Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=246644444747661312&scope=bot&permissions=0`);
    message.channel.sendMessage(`Join my developer's server https://discord.gg/e2B2nHX`);
  };

  if(command ==="stats") {
    const embed = new Discord.RichEmbed();
         const now = new Date();
        embed.setColor(462224)
        .setAuthor(`NelsonManbot`, `${client.user.avatarURL}`)
        .setThumbnail(`${client.user.avatarURL}`)
        .addField(`Info`, `Bot created by Mjatt`, true)
        .addField(`Language`, `Javascript`, true)
        .addField(`Bot Version`, `0.4`, true)
        .addField(`Memory`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField(`Servers`, `${client.guilds.size.toLocaleString()}`, true)
        .addField(`Channels`, `${client.channels.size.toLocaleString()}`, true)
        .addField(`Users`, `${client.users.size.toLocaleString()}`, true)
         .setFooter(`Request generated at ${now}`)
        message.channel.sendEmbed(embed);
      };


  if(command === "server") {
    if(message.guild === null) {
      message.reply('Go in a guild first');
    } else {
  let name = message.guild.id;

    console.log(name);
    let embed = new Discord.RichEmbed();
    var emojis = client.guilds.get(name).emojis.map(e => e).join(": ");
    if(emojis === undefined){
      emojis = "\u200b";
    }
    const now = new Date();
    embed
    .setColor(462224)
    .setAuthor(`${client.guilds.get(name).name}`, client.guilds.get(name).iconURL)
    .setTitle(`${client.guilds.get(name).name}` , "Server Info")
    .setThumbnail(client.guilds.get(name).iconURL)
    .addField(`Server ID`, name, true)
    .addField(`Owner`, `${client.guilds.get(name).owner}`, true)
    .addField(`Region`, `${client.guilds.get(name).region}`, true)
    .addField(`Created On`, `${client.guilds.get(name).createdAt}`, true)
    .addField(`Member Count`, `${client.guilds.get(name).memberCount}`, true)
    .addField(`Channels`, `${client.guilds.get(name).channels.map(c => c.name).join(", ")}`)
    .addField(`Roles`, `${client.guilds.get(name).roles.map(r => r.name).join(", ")}`)
    .setFooter(`Request created at ` + now)
    message.channel.sendEmbed(embed);
};

  if(command === ban) {
    let can_manage_chans = message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")
    if(!can_manage_chans) {
       message.reply('Insufficient Permissions');
    } else {
      if(message.mentions.users.first === null) {
        message.reply('Unspecified user');
      } else {
        message.channel.sendMessage('reason for ban:') .then(() => {
          message.channel.awaitMessages(respone => response.content !== null, {
            max: 1,
            time: 30000,
            errors: ['time'],
          })
          .then((collected) => {
            message.channel.snedMessage('${collected.first().content}');
          })
          .catch(() => {
            message.channel.sendMessage('No reason specfied');
          })
        })
      }
    }
  };

  if(command==="born") {
    message.reply(`Your account was born at ${message.author.createdAt}`);
  };

  if(command==="id") {
    message.channel.sendMessage(`Your Discord user ID is ${message.author.id}`);
  };

if(command ==="purge") {
  let can_manage_chans = message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")
  if (can_manage_chans) {
    let messagecount = parseInt(args[0]);
    message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages));
  }
};

  if(command ==="avatar") {
    message.reply(message.author.avatarURL);
  };

  if(command === "register") {
    firebaseRef.child("Users").child(message.author.username).set(10);
    message.reply(`Registered ${message.author.user} as ${message.author.username}`);
  };

  /* if(command ==="getbonks") {
    return firebase.database.ref('/users/').once('value'.then(function(snapshot) {
      var username = snapshot.val().username;
    }))
  } */

  if(command === "createtag") {
    let args = message.content.split(" ").slice(1);
    let tag = args[0];
    let video = args[1];
    firebaseRef.child("Tags").child(tag).set(video);
    message.channel.sendMessage(`Tag created as ${tag}`);
  }

  if(command === "tag") {
    let args = message.content.split(" ").slice(1);
    let tag = args[0];
    const voiceChannel = message.member.voiceChannel;
    var video = firebaseRef.child('Tags');
    var final = video.toString();
    if(!voiceChannel) {
      return message.reply(`You must be in a voice channel first`);
    };
    console.log(`${message.author.username} just triggered the tag: ${tag}`);
    voiceChannel.join()
      .then(connection => {
        let stream = yt(final, {audioonly: true});
        const dispatcher = connection.playStream(stream);
        dispatcher.on('end', () => {
          voiceChannel.leave();
        });
      });

  };

  if(command === "say") {
    message.channel.sendMessage(args.join(" ")); //makes the bot say the user's input
    console.log(`${message.author.username} + just made me say something`);
  }

  if (command ==="version") {
    message.channel.sendMessage(`v0.4: The latest update was 11 April 2017, view the details here: http://mtaggart.uk/discord.html`); //just the version of the bot thats currently out
    console.log(message.author.username + " just viewed the latest update date");
  }

  if(command ==="play") {
    let args = message.content.split(" ").slice(1); //gets the url of the video
    let video = args[0]; //stores the url as the video
    const voiceChannel = message.member.voiceChannel; //gets the users voice channel
      if (!voiceChannel) { //if theyre not in a voice channel
        return message.reply(`Join a voice channel you speng`); //aborts the command
      };
      console.log(`${message.author.username} just made me play ${video}`);
      message.channel.sendMessage(`Now playing in ${voiceChannel}`);
      voiceChannel.join() //joins the channel
        .then(connnection => {
          let stream = yt(video, {audioonly: true}); //streams the audio through the voice channel
          const dispatcher = client.voiceConnections.get("181839332313792518").playStream(stream);
          dispatcher.on('end', () => { //when the video ends
            voiceChannel.leave(); //leaves the voice channel
          });
        });
    };

    if(command ==="stop") {
      const voiceChannel = message.member.voiceChannel; //gets the voice channel the user is in
      if(!voiceChannel) {
        return message.reply('You need to join a channel first');
      }
      voiceChannel.leave(); //if theyre in the voicechannel then leaves
      console.log(`${message.author.username} just made me leave ${message.member.voiceChannel}`);
      message.channel.sendMessage(`Leaving ${message.member.voiceChannel}`);
    };

  if(command ==="test") {
    const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) {
        return message.reply(`You need to join a channel first`);
      }
      console.log(`${message.author.username} just tested audio playback in ${message.member.voiceChannel}`);
      message.channel.sendMessage(`Testing playback in ${voiceChannel}`);
      voiceChannel.join()
        .then(connnection => {
          let stream = yt("https://www.youtube.com/watch?v=672k6ov-qzQ", {audioonly: true}); //plays a default video to test connections
          const dispatcher = connnection.playStream(stream);
          dispatcher.on('end', () => {
            voiceChannel.leave();
          });
        });
    };

  if (command === "add") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c); //adds numbers together
    message.channel.sendMessage(total);
    console.log(`${message.author.username} just added numbers together`);
  }

  if(command ==="multiply") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c); //multiplies numbers together
    message.channel.sendMessage(total);
    console.log(`${message.author.username} just multiplied numbers together`);
  }

  if(command ==="divide") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c); //divides numbers
    message.channel.sendMessage(total);
    console.log(`${message.author.username} just divided numbers`);
  }

  if (command ==="love") {
    let args = message.content.split(" ").slice(1);
    let lover = args[0];
    let second = args[1];
    var answer = Math.floor((Math.random() * 100) +1); //picks a number between 1-100 to see how much someone loves someone
    if(second == null) {
    message.channel.sendMessage(`There is ${answer} % love between ${message.author} and ${lover}`);
    console.log(`There is ${answer} % love between ${message.author} and ${lover}`);
  } else {
    message.channel.sendMessage(`There is ${answer} % love between ${message.author} and ${lover} ${second}`);
    console.log(message.author.username + " just tested their love with " + lover + " " + second);
}};

  if (command === "ping") {
    message.reply("pong"); //tests the connection
    console.log(`${message.author.username} just played pingpong`);
  }

  if(command === "help") {
    message.reply("Slide into your DMs like");
    message.author.sendMessage(`Follow this link to find out everything that I can do: http://www.mtaggart.uk/commands.html`); //shows all the commands that the bot has
    console.log(`${message.author.username} just asked for help`);
  }

if (command === "8ball") {
  let x = message.content.split(" ").slice(1);
  if (x == "") { //checks to see if theres a question
    message.channel.sendMessage(`There's no question you speng`);
  } else {
  var answers = ['Definitely', 'Maybe', 'Yes', 'No', 'You wish', 'I hope not', 'Go find out', 'Hello?',
  'Probably not', 'Good joke', 'That question made me want to die']; //all the answers that could be picked
  var answer = answers[Math.floor(Math.random() * answers.length)]; //picks an answer by random
  message.channel.sendMessage(answer);
  console.log(`${message.author.username} just rolled the 8ball`);
};
};

if (command === "dice") {
  var number = ['1', '2', '3', '4','5','6'];
  var answer = number[Math.floor(Math.random() * number.length)]; //picks a random number from the length of the array
  message.channel.sendMessage(answer);
  console.log(`${message.author.username} just rolled a dice`);
}

if (command ==="waifu") { //basically the same as +love
  let args = message.content.split(" ").slice(1);
  let waifu = args[0];
  let second = args[1];
  var answer = ['1','2','3','4','5','6','7','8','9','10'];
  var rating = answer[Math.floor(Math.random() * answer.length)];
  if(second == null) {
  message.channel.sendMessage(`${waifu} is a ${rating}/10 waifu`);
  console.log(`${message.author.username} just asked how good ${waifu} is as a waifu`);
} else {
  message.channel.sendMessage(`${waifu} ${second} is a ${rating}/10 waifu`);
  console.log(`${message.author.username} just asked how good ${waifu} ${second} is as a waifu`);
}
}

if(command==="champion") {
console.log(message.author.username + " just randomised a champion");
let args = message.content.split(" ").slice(1);
let lane = args[0]; //checks to see what lane the user wants
if(lane ==="top") {
  var champion = ['Aatrox', 'Akali','Renekton','Nasus','Alistar','Camille','ChoGath','Darius','Dr Mundo','Ekko','Fiora','Galio','Gangplank','Garen','Gnar','Hecarim','Heimerdinger','Illaoi','Irelia','Jarvan','Jax','Jayce',
  'Kayle','Kennen','Kled','Lee Sin','Lissandra','Malphite','Maokai','Mordekaiser','Nautilus','Nunu','Olaf','Pantheon','Poppy','Quinn','Rengar','Rumble','Riven','Ryze','Shen','Singed','Sion','Swain','Tahm Kench','Teemo',
  'Trundle','Tryndamere','Urgot','Vladimir','Volibear','Wukong','Yausp','Yorick'];
  var items = ['Abyssal Scepter','Archangels Staff','Ardent Censer','Athenes Unholy Grail','Banner Of Command','Banshees Veil','Blade of the Ruined King'
  ,'Dead Mans Plate','Deaths Dance','Essence Reaver','Eye of the Equinox','Eye of the Oasis','Eye of the Watchers','Face of the Mountain',
  'Frost Queens Claim','Frozen Heart','Frozen Mallet','Guardian Angel','Guinsoos Rageblade','Hextech GLP-800','Hextech Gunblade','Hextech Protobelt-01','Iceborn Gauntlet','Liandrys Torment',
  'Infinity Edge','Knights Vow','Lich Bane','Locket of the Iron Solari','Lord Dominiks Regards','Ludens Echo','Manamune','Maw of Malmortius','Mejais Soulstealer',
  'Mercurial Scimitar','Mikaels Crucible','Morellonomicon','Mortal Reminder','Nashors Tooth','Ninja Tabi','Ohmwrecker','Phantom Dancer','Rabadons Deathcap',' Randuins Omen',
  'Rapid Firecannon','Ravenous Hydra','Redemption','Righteous Glory','Rod of Ages','Ruby Sightstone','Runaans Hurricane','Rylais Crystal Scepter','Seraphs Embrace',
  'Spirit Visage','Statikk Shiv','Steraks Gage','Sunfire Cape','Talisman of Ascension','The Black Cleaver','The Bloodthirster','Thornmail','Titanic Hydra','Trinity Force',
  'Void Staff','Warmogs Armor','Wits End','Youmuus Ghostblade','Zekes Harbinger','Zhonyas Hourglass','ZzRot Portal'];
  var boots = ['Berserkers Greaves','Boots of Mobility','Boots of Swiftness','Ionian Boots of Lucidity','Mercury Treads','Sorcerers Shoes'];
  var answer1 = boots[Math.floor(Math.random() * boots.length)];
  var answer2 = items[Math.floor(Math.random() * items.length)];
  var answer3 = items[Math.floor(Math.random() * items.length)];
  var answer4 = items[Math.floor(Math.random() * items.length)];
  var answer5 = items[Math.floor(Math.random() * items.length)];
  var answer6 = items[Math.floor(Math.random() * items.length)];
  var answer7 = champion[Math.floor(Math.random() * champion.length)];
  message.reply("**ITEM 1**" + " " + answer1 + " " + "**ITEM 2**" + " " + answer2 + " " + "**ITEM 3**" + " " + answer3 + " " + "**ITEM 4**" + " " + answer4 + " " + "**ITEM 5**" + " " + answer5 + " " + "**ITEM 6**" + " " + answer6 + " " + "**CHAMPION**" + " " + answer7);
}
if (lane ==="mid") {
  var champion = ['Ahri', 'Anivia','Xerath','Velkoz','Annie','Camille','Aurelion Sol','Azir','Brand','Cassiopeia','Corki','Diana','Ekko','Ezreal','Fizz','Galio','Gragas','Graves','Heimerdinger','Karma','Karthus','Kassadin','Katarina',
  'Kayle','Kennen','Kogmaw','LeBlanc','Lissandra','Lulu','Lux','Malzahar','Mordekaiser','Morgana','Nidalee','Orianna','Ryze','Sona','Soraka','Swain','Syndra','Taliyah','Talon','Teemo','Tristana','Twisted Fate','Urgot','Varus','Veigar'
  ,'Viktor','Vladimir','Yauso','Zed','Zilean','Zyra','Ziggs'];;
  var items = ['Abyssal Scepter','Archangels Staff','Ardent Censer','Athenes Unholy Grail','Banner Of Command','Banshees Veil','Blade of the Ruined King'
  ,'Dead Mans Plate','Deaths Dance','Essence Reaver','Eye of the Equinox','Eye of the Oasis','Eye of the Watchers','Face of the Mountain',
  'Frost Queens Claim','Frozen Heart','Frozen Mallet','Guardian Angel','Guinsoos Rageblade','Hextech GLP-800','Hextech Gunblade','Hextech Protobelt-01','Iceborn Gauntlet','Liandrys Torment',
  'Infinity Edge','Knights Vow','Lich Bane','Locket of the Iron Solari','Lord Dominiks Regards','Ludens Echo','Manamune','Maw of Malmortius','Mejais Soulstealer',
  'Mercurial Scimitar','Mikaels Crucible','Morellonomicon','Mortal Reminder','Nashors Tooth','Ninja Tabi','Ohmwrecker','Phantom Dancer','Rabadons Deathcap',' Randuins Omen',
  'Rapid Firecannon','Ravenous Hydra','Redemption','Righteous Glory','Rod of Ages','Ruby Sightstone','Runaans Hurricane','Rylais Crystal Scepter','Seraphs Embrace',
  'Spirit Visage','Statikk Shiv','Steraks Gage','Sunfire Cape','Talisman of Ascension','The Black Cleaver','The Bloodthirster','Thornmail','Titanic Hydra','Trinity Force',
  'Void Staff','Warmogs Armor','Wits End','Youmuus Ghostblade','Zekes Harbinger','Zhonyas Hourglass','ZzRot Portal'];
  var boots = ['Berserkers Greaves','Boots of Mobility','Boots of Swiftness','Ionian Boots of Lucidity','Mercury Treads','Sorcerers Shoes'];
  var answer1 = boots[Math.floor(Math.random() * boots.length)];
  var answer2 = items[Math.floor(Math.random() * items.length)];
  var answer3 = items[Math.floor(Math.random() * items.length)];
  var answer4 = items[Math.floor(Math.random() * items.length)];
  var answer5 = items[Math.floor(Math.random() * items.length)];
  var answer6 = items[Math.floor(Math.random() * items.length)];
  var answer7 = champion[Math.floor(Math.random() * champion.length)];
  message.reply("**ITEM 1**" + " " + answer1 + " " + "**ITEM 2**" + " " + answer2 + " " + "**ITEM 3**" + " " + answer3 + " " + "**ITEM 4**" + " " + answer4 + " " + "**ITEM 5**" + " " + answer5 + " " + "**ITEM 6**" + " " + answer6 + " " + "**CHAMPION**" + " " + answer7);
}
  if (lane ==="bot") {
    var champion = ['Lucian','Jinx','Vayne','Twitch','Ashe','Caitlyn','Camille','Corki','Draven','Ezreal','Jhin','Kalista','Kindred','Miss Fortune','Quinn','Sivir','Soraka','Teemo','Tristana','Twisted Fate','Urgot','Veigar','Yasuo',''];
    var items = ['Abyssal Scepter','Archangels Staff','Ardent Censer','Athenes Unholy Grail','Banner Of Command','Banshees Veil','Blade of the Ruined King'
    ,'Dead Mans Plate','Deaths Dance','Essence Reaver','Eye of the Equinox','Eye of the Oasis','Eye of the Watchers','Face of the Mountain',
    'Frost Queens Claim','Frozen Heart','Frozen Mallet','Guardian Angel','Guinsoos Rageblade','Hextech GLP-800','Hextech Gunblade','Hextech Protobelt-01','Iceborn Gauntlet','Liandrys Torment',
    'Infinity Edge','Knights Vow','Lich Bane','Locket of the Iron Solari','Lord Dominiks Regards','Ludens Echo','Manamune','Maw of Malmortius','Mejais Soulstealer',
    'Mercurial Scimitar','Mikaels Crucible','Morellonomicon','Mortal Reminder','Nashors Tooth','Ninja Tabi','Ohmwrecker','Phantom Dancer','Rabadons Deathcap',' Randuins Omen',
    'Rapid Firecannon','Ravenous Hydra','Redemption','Righteous Glory','Rod of Ages','Ruby Sightstone','Runaans Hurricane','Rylais Crystal Scepter','Seraphs Embrace',
    'Spirit Visage','Statikk Shiv','Steraks Gage','Sunfire Cape','Talisman of Ascension','The Black Cleaver','The Bloodthirster','Thornmail','Titanic Hydra','Trinity Force',
    'Void Staff','Warmogs Armor','Wits End','Youmuus Ghostblade','Zekes Harbinger','Zhonyas Hourglass','ZzRot Portal'];
    var boots = ['Berserkers Greaves','Boots of Mobility','Boots of Swiftness','Ionian Boots of Lucidity','Mercury Treads','Sorcerers Shoes'];
    var answer1 = boots[Math.floor(Math.random() * boots.length)];
    var answer2 = items[Math.floor(Math.random() * items.length)];
    var answer3 = items[Math.floor(Math.random() * items.length)];
    var answer4 = items[Math.floor(Math.random() * items.length)];
    var answer5 = items[Math.floor(Math.random() * items.length)];
    var answer6 = items[Math.floor(Math.random() * items.length)];
    var answer7 = champion[Math.floor(Math.random() * champion.length)];
    message.reply("**ITEM 1**" + " " + answer1 + " " + "**ITEM 2**" + " " + answer2 + " " + "**ITEM 3**" + " " + answer3 + " " + "**ITEM 4**" + " " + answer4 + " " + "**ITEM 5**" + " " + answer5 + " " + "**ITEM 6**" + " " + answer6 + " " + "**CHAMPION**" + " " + answer7);
  }
if (lane ==="support") {
  var champion = ['Bard','Annie','Sion','Thresh','Alistar','Blitzcrank','Brand','Braum','Chogath','Galio','Ivern','Janna','Jarvan','Karma','Kayle','Kennen','Leona','Lissandra','Lulu','Lux','Malphite','Malzahar','Maokai','Morgana','Nami','Nautilus','Nunu','Orianna','Poppy','Rammus','Sejuani','Shaco','Shen',
  'Sion','Skarner','Sona','Soraka','Swain','Tahm Kench','Taric','Twisted Fate','Udyr','Veigar','Volibear','Xerath','Zac','Zilean','Zyra'];
  var items = ['Abyssal Scepter','Archangels Staff','Ardent Censer','Athenes Unholy Grail','Banner Of Command','Banshees Veil','Blade of the Ruined King'
  ,'Dead Mans Plate','Deaths Dance','Essence Reaver','Eye of the Equinox','Eye of the Oasis','Eye of the Watchers','Face of the Mountain',
  'Frost Queens Claim','Frozen Heart','Frozen Mallet','Guardian Angel','Guinsoos Rageblade','Hextech GLP-800','Hextech Gunblade','Hextech Protobelt-01','Iceborn Gauntlet','Liandrys Torment',
  'Infinity Edge','Knights Vow','Lich Bane','Locket of the Iron Solari','Lord Dominiks Regards','Ludens Echo','Manamune','Maw of Malmortius','Mejais Soulstealer',
  'Mercurial Scimitar','Mikaels Crucible','Morellonomicon','Mortal Reminder','Nashors Tooth','Ninja Tabi','Ohmwrecker','Phantom Dancer','Rabadons Deathcap',' Randuins Omen',
  'Rapid Firecannon','Ravenous Hydra','Redemption','Righteous Glory','Rod of Ages','Ruby Sightstone','Runaans Hurricane','Rylais Crystal Scepter','Seraphs Embrace',
  'Spirit Visage','Statikk Shiv','Steraks Gage','Sunfire Cape','Talisman of Ascension','The Black Cleaver','The Bloodthirster','Thornmail','Titanic Hydra','Trinity Force',
  'Void Staff','Warmogs Armor','Wits End','Youmuus Ghostblade','Zekes Harbinger','Zhonyas Hourglass','ZzRot Portal'];
  var boots = ['Berserkers Greaves','Boots of Mobility','Boots of Swiftness','Ionian Boots of Lucidity','Mercury Treads','Sorcerers Shoes'];
  var answer1 = boots[Math.floor(Math.random() * boots.length)];
  var answer2 = items[Math.floor(Math.random() * items.length)];
  var answer3 = items[Math.floor(Math.random() * items.length)];
  var answer4 = items[Math.floor(Math.random() * items.length)];
  var answer5 = items[Math.floor(Math.random() * items.length)];
  var answer6 = items[Math.floor(Math.random() * items.length)];
  var answer7 = champion[Math.floor(Math.random() * champion.length)];
  message.reply("**ITEM 1**" + " " + answer1 + " " + "**ITEM 2**" + " " + answer2 + " " + "**ITEM 3**" + " " + answer3 + " " + "**ITEM 4**" + " " + answer4 + " " + "**ITEM 5**" + " " + answer5 + " " + "**ITEM 6**" + " " + answer6 + " " + "**CHAMPION**" + " " + answer7);
}
  if (lane ==="jungle") {
    var champion = ['Reksai','Khazix','Rengar','Poppy','Teemo','Trundle','Tryndamere','Twitch','Udyr','Zyra','Zac','Xin Zhao','Wukong','Warwick','Volibear','Vi','Aatrox','Alistar','Amumu','Camille','Chogath','Diana','Ekko','Elise','Evelynn',
    'Fiddlesticks','Fizz','Gragas','Graves','Hecarim','Ivern','Jarvan','Camille',
    'Jax','Jhin','Kassadin','Kayle','Khazix','Kindred','Lee Sin','Malphite','Maokai',
    'Master Yi','Nasus','Nautilus','Nidalee','Nocturne','Nunu','Olaf','Pantheon','Poppy','Quinn','Rammus','Reksai','Sejuani','Shaco','Shyvana','Sion','Skarner'];
    var items = ['Abyssal Scepter','Archangels Staff','Ardent Censer','Athenes Unholy Grail','Banner Of Command','Banshees Veil','Blade of the Ruined King'
    ,'Dead Mans Plate','Deaths Dance','Essence Reaver','Eye of the Equinox','Eye of the Oasis','Eye of the Watchers','Face of the Mountain',
    'Frost Queens Claim','Frozen Heart','Frozen Mallet','Guardian Angel','Guinsoos Rageblade','Hextech GLP-800','Hextech Gunblade','Hextech Protobelt-01','Iceborn Gauntlet','Liandrys Torment',
    'Infinity Edge','Knights Vow','Lich Banee','Locket of the Iron Solari','Lord Dominiks Regards','Ludens Echo','Manamune','Maw of Malmortius','Mejais Soulstealer',
    'Mercurial Scimitar','Mikaels Crucible','Morellonomicon','Mortal Reminder','Nashors Tooth','Ninja Tabi','Ohmwrecker','Phantom Dancer','Rabadons Deathcap',' Randuins Omen',
    'Rapid Firecannon','Ravenous Hydra','Redemption','Righteous Glory','Rod of Ages','Ruby Sightstone','Runaans Hurricane','Rylais Crystal Scepter','Seraphs Embrace',
    'Spirit Visage','Statikk Shiv','Steraks Gage','Sunfire Cape','Talisman of Ascension','The Black Cleaver','The Bloodthirster','Thornmail','Titanic Hydra','Trinity Force',
    'Void Staff','Warmogs Armor','Wits End','Youmuus Ghostblade','Zekes Harbinger','Zhonyas Hourglass','ZzRot Portal'];
    var boots = ['Berserkers Greaves','Boots of Mobility','Boots of Swiftness','Ionian Boots of Lucidity','Mercury Treads','Sorcerers Shoes'];
    var jungle = ['Skirmishers Bloodrazor',' Skirmishers Cinderhulk','Skirmishers Runic Echoes','Skirmishers Warrior','Stalkers Blade Bloodrazor','Stalkers Blade Cinderhulk','Stalkers Blade Runic Echoes',' Stalkers Blade Warrior',
    'Trackers Knife Bloodrazor','Trackers Kinfe Cinderhulk','Trackers Knife Runic Echoes',' Trackers Knife Warrior'];
    var answer1 = boots[Math.floor(Math.random() * boots.length)];
    var answer2 = jungle[Math.floor(Math.random() * jungle.length)];
    var answer3 = items[Math.floor(Math.random() * items.length)];
    var answer4 = items[Math.floor(Math.random() * items.length)];
    var answer5 = items[Math.floor(Math.random() * items.length)];
    var answer6 = items[Math.floor(Math.random() * items.length)];
    var answer7 = champion[Math.floor(Math.random() * champion.length)];
    message.reply("**ITEM 1**" + " " + answer1 + " " + "**ITEM 2**" + " " + answer2 + " " + "**ITEM 3**" + " " + answer3 + " " + "**ITEM 4**" + " " + answer4 + " " + "**ITEM 5**" + " " + answer5 + " " + "**ITEM 6**" + " " + answer6 + " " + "**CHAMPION**" + " " + answer7);
  }
}

if (command ==="item") { //randomises a single item, used in conjunction with the champion command in case of a duplication/error with the previous commands
  console.log(message.author.username + " just randomised an item");
  var items = ['Abyssal Scepter','Archangels Staff','Ardent Censer','Athenes Unholy Grail','Banner Of Command','Banshees Veil','Berserkers Greaves','Blade of the Ruined King',
  'Boots of Mobility','Boots of Swiftness','Dead Mans Plate','Deaths Dance','Essence Reaver','Eye of the Equinox','Eye of the Oasis','Eye of the Watchers','Face of the Mountain',
  'Frost Queens Claim','Frozen Heart','Frozen Mallet','Guardian Angel','Guinsoos Rageblade','Hextech GLP-800','Hextech Gunblade','Hextech Protobelt-01','Iceborn Gauntlet','Liandrys Torment',
  'Infinity Edge','Ionian Boots of Lucidity','Knights Vow','Lich Bane','Locket of the Iron Solari','Lord Dominiks Regards','Ludens Echo','Manamune','Maw of Malmortius','Mejais Soulstealer',
  'Mercurial Scimitar','Mercury Treads','Mikaels Crucible','Morellonomicon','Mortal Reminder','Nashors Tooth','Ninja Tabi','Ohmwrecker','Phantom Dancer','Rabadons Deathcap',' Randuins Omen',
  'Rapid Firecannon','Ravenous Hydra','Redemption','Righteous Glory','Rod of Ages','Ruby Sightstone','Runaans Hurricane','Rylais Crystal Scepter','Seraphs Embrace',
  'Sorcerers Shoes','Spirit Visage','Statikk Shiv','Steraks Gage','Sunfire Cape','Talisman of Ascension','The Black Cleaver','The Bloodthirster','Thornmail','Titanic Hydra','Trinity Force',
  'Void Staff','Warmogs Armor','Wits End','Youmuus Ghostblade','Zekes Harbinger','Zhonyas Hourglass','ZzRot Portal'];
  var answer = items[Math.floor(Math.random()*items.length)];
  message.reply(answer);

}
if (command === "stab") {
  let args = message.content.split(" ").slice(1);
  let victim = args[0];
  message.reply(`stabbed ${victim} rippo my gyppo`); //simulates stabbing a user input by sending a message
  console.log(message.author.username + " just stabbed " + victim);
} else {
  return;
};
});
}

client.login(key.token); //the token used to initiate the bot, KEEP SECRET PLS
