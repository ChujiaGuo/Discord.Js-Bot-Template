const fs = require('fs')
const Discord = require('discord.js')
const helpers = require('../helpers')

module.exports = async (client, message) => {
    //Requires and Imports
    const config = JSON.parse(fs.readFileSync('config.json'))
    const permissions = JSON.parse(fs.readFileSync('commands/permissions.json'))

    //Various checks
    if (message.author.bot) return; //Check if bot user
    if (message.content.includes(`${client.user} prefix`)) return message.channel.send(`Current Prefix: ${config.prefix}`); //Check for prefix query
    if (message.content.charAt(0) != config.prefix) return; //Check for prefix
    if (!config.commandChannels.includes(message.channel.id)) return; //Check for command channel

    //Message Parsing
    let content = message.content.split(" ")
    let command = content[0].substring(1)
    command = client.aliases.get(command) || command
    let args = content.join(" ")

    //Check Permissions
    let auth = await helpers.permissionsHelper(message.member, permissions[command])
    if (!auth) {
        let permissionDenied = new Discord.MessageEmbed()
            .setColor("#ff1212")
            .setAuthor("Permission Denied")
            .setDescription(`You do not have permission to use this command.\n<@&${permissions[command]}> or higher is required to use it.`)
        message.channel.send(permissionDenied)
    } else {
        //Run Command
        const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        commandFile.run(client, message, args, Discord)
    }
}