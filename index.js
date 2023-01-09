require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const fs = require('fs');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.player = new DisTube(client, {
    leaveOnStop: true,
    plugins: [new SpotifyPlugin()],
})

const player = client.player;

fs.readdir('./events/', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        console.log(`Cargando eventos ${eventName}`);
        client.on(eventName, event.bind(null, client));
    })
})

fs.readdir('./events/player/', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/player/${file}`);
        let eventName = file.split('.')[0];
        console.log(`Cargando los eventos players ${eventName}`);
        player.on(eventName, event.bind(null, client));
    })
})

client.commands = []
fs.readdir('./commands/', (err, files) => {
    if (err) throw err;
    files.forEach((f) => {
        try {
            if (f.endsWith('.js')) {
                let props = require(`./commands/${f}`);
                client.commands.push({
                    name: props.name,
                    description: props.description,
                    options: props.options,
                });
                console.log(`Cargando comandos ${props.name}`)
            }
        } catch (err) {
            console.log(err)
        }
    })
})

client.login(process.env.TOKEN_BOT);