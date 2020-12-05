//Require Discord API
const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

//Require Other Libraries
const fs = require("fs")
const requireAll = require('require-all')

//Require Local Files
const config = require("./config.json")
const privatekeys = require("./privatekeys.json")
const helpers = require("./helpers/index.js")

//Load Events and Commands
client.removeAllListeners() //To prevent double listeners
loadAll()

//Reload on edit
fs.watch('./events/', async (eventType, filename) => {
    reloadUncached(`./events/${filename}`)
    loadEvents(true)
    console.log(`Event reloaded: ${filename}`)
})
fs.watch('./commands/', async (eventType, filename) => {
    reloadUncached(`./commands/${filename}`)
    loadAllCommands(true)
    console.log(`Command reloaded: ${filename}`)
})


//Unhandled Rejections and Errors
process.on("unhandledRejection", err => {
    console.error(`Unhandled Promise Rejection: ${err}`)
    console.error(err)
})
process.on("uncaughtException", err => {
    console.error(`Unhandled Exection: ${err}`)
    console.error(err)
})

//Sign in to Discord
let token = privatekeys.token
client.login(token)

//Functions
function loadAll(silent = false) {
    loadEvents(silent)
    loadAllCommands(silent)
}

function loadEvents(silent = false) {
    try {
        //Events
        const events = requireAll({ dirname: `${__dirname}/events`, filter: /^(?!-)(.+)\.js$/ })
        for (const name in events) {
            const event = events[name]
            client.on(name, event.bind(null, client))
            if (!silent) console.log(`Event loaded: ${name}`)
        }
        if (!silent) console.log(`All Events Loaded\n`)
    }catch(e){
        console.log("Failed to load events.")
    }
}

function loadAllCommands(silent = false) {
    try {
        //Commands
        let commands = requireAll({ dirname: `${__dirname}/commands`, filter: /^(?!-)(.+)\.js$/ })
        client.commands = new Map();
        client.aliases = new Map();
        for (const name in commands) {
            const command = commands[name]
            client.commands.set(command.config.name, command)
            for (const a of command.config.aliases) client.aliases.set(a, command.config.name)
            if (!silent) console.log(`Command loaded: ${command.config.name}`)
        }
        if (!silent) console.log(`All Commands Loaded\n`)
        //Custom Commands
        commands = requireAll({ dirname: `${__dirname}/custom_commands`, filter: /^(?!-)(.+)\.js$/ })
        for (const name in commands) {
            const command = commands[name]
            client.commands.set(command.config.name, command)
            for (const a of command.config.aliases) client.aliases.set(a, command.config.name)
            if (!silent) console.log(`Command loaded: ${command.config.name}`)
        }
        if (!silent) console.log(`All Custom Commands Loaded\n`)
    } catch (e) {
        console.log(`Failed to load commands.`)
    }
}

function reloadUncached(module) {
    delete require.cache[require.resolve(module)]
    try{require(module)}catch(e){console.log(`${module} failed to load.`)}
    return
}
