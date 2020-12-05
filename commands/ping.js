exports.run = async (client, message, args, Discord) => {
    const m = await message.channel.send("Ping?");

    let statusEmbed = new Discord.MessageEmbed()
        .setTitle("Bot Status and Information")
        .setColor("#30ffea")
        .addField("Bot Latency:", m.createdTimestamp - message.createdTimestamp, true)
        .addField("API Latency:", Math.round(client.ws.ping), true)
        .addField("Uptime:", `${Math.floor(client.uptime / 86400000)} Days ${Math.floor((client.uptime - Math.floor(client.uptime / 86400000) * 86400000) / 3600000)} Hours ${Math.round((client.uptime - Math.floor(client.uptime / 86400000) * 86400000 - Math.floor((client.uptime - Math.floor(client.uptime / 86400000) * 86400000) / 3600000) * 3600000) / 60000)} Minutes`)
    await m.edit("", statusEmbed)
}
exports.config = {
    "name": "ping",
    "description": "",
    "aliases": ["status"]
}