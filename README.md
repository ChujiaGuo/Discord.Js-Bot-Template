# Discord.js Bot Template
Written by: Chujia Guo

This project is my attempt at making a discord bot template. It can be reused to make multiple bots without starting from scratch.

### Features:
- Custom Command Ready
- Has some basic commands such as `ping` and `help`
- Commands have permissions.

### Setup:
- Before starting, make sure you have [Node.js](https://nodejs.org/en/download/) and [Discord.js](https://discord.js.org/#/) installed.
- In order to start using the bot, create a `privatekeys.json` file in the root folder. (This is where the `main.js` file is)
- In that file, add your token in JSON format, like so:
```json
{
    "token":"insert-token-here"
}
```
- Install dependencies by running `npm install dependencies` while in this folder.
- Add your bot to the server of your choice, run `node main.js` in your terminal and you should be all set!

### Default Commands:
- [`ping`](./commands/ping.js)
- [`setup`](./commands/setup.js)
- [`help`](./commands/help.js)

### Adding Commands:
- Add custom commands in the `custom_commands` folder.
- Basic Command Template:
```js
exports.run = async (client, message, args, Discord) => {
        //Insert Code Here!
}
exports.config = {
    "name": "",
    "description":"",
    "aliases": [""]
}
```
- Manually add permissions in the [`permissions.json`](./custom_commands/permissions.json) file using command name to role id pairs, or by using the `setup` command.