exports.run = (client, message, args) => {
    const Discord = require("discord.js");
    var request = require('superagent');
    var parseString = require('xml2js').parseString;
    var xml2js = require('xml2js');
    const name = args.join("_");
    const embed = new Discord.RichEmbed();
    const info = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+population+currency+region+wa+flag+fullname+motto+influence+census;mode=score;scale=66`);
    info.then((res) => {
        parseString(res.text, (err, obj) => {
            embed.setColor('BLUE')
                .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
                .setTitle(`${obj.NATION.FULLNAME}`)
                .setDescription(`${obj.NATION.MOTTO}`)
                .setThumbnail(`${obj.NATION.FLAG}`)
                .addField('Region', obj.NATION.REGION, true)
                .addField('Influence', obj.NATION.INFLUENCE, true)
                .addField('Population', (obj.NATION.POPULATION * 1000000).toLocaleString(), true)
                .addField('World Assembly Member?', obj.NATION.UNSTATUS, true)
                .addField('Endorsements', Math.round(obj.NATION.CENSUS[0].SCALE[0].SCORE), true)
                .addField('Link', "http://www.nationstates.net/nation=" + name)
            message.channel.send({ embed: embed });

        })
    })
        .catch((err) => {
            if (err) {
                message.channel.send(`Error: invalid nation.`);
            }
        })

};
