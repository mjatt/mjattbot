exports.run = (client, message, args) => {
    const Discord = require("discord.js");
    var request = require('superagent');
    var parseString = require('xml2js').parseString;
    var xml2js = require('xml2js');
    const embed = new Discord.RichEmbed();
    const name = args.join("_");
    const info = request.get(`https://nationstates.net/cgi-bin/api.cgi?region=${name}&q=founder+name+numnations+power+tags+flag+delegate`);
    info.then((res) => {
        parseString(res.text, (err, obj) => {
            embed.setColor(3447003)
                .setAuthor(obj.REGION.NAME, `${obj.REGION.FLAG}`)
                .setTitle(`${obj.REGION.NAME}`)
                .setDescription(`Info for ${obj.REGION.NAME}`)
                .setThumbnail(`${obj.REGION.FLAG}`)
                .addField(`Founder`, obj.REGION.FOUNDER, true)
                .addField(`Nation Count`, obj.REGION.NUMNATIONS, true)
                .addField(`Power`, obj.REGION.POWER, true)
                .addField(`World Assembly Delegate`, obj.REGION.DELEGATE, true)
                .addField(`Link`, `https://www.nationstates.net/region=${name}`)
            message.channel.send({ embed: embed });
        })
    })
        .catch((err) => {
            if (err) {
                message.channel.send(`Error: invalid region.`);
            }
        })

};
