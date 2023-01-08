module.exports = async (client) => {
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v10');

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN_BOT);

    (async () => {
        try {

            // Para uso en un solo servidor (guild) replazar el siguiente codigo por:
            // await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), { body: client.commands });
            // y Eliminar la siguiente linea

            await rest.put(Routes.applicationCommands(client.user.id), { body: client.commands });
            
            console.log(`registrando comandos de barra`)
        } catch (err) {
            console.log(err)
        }
    })();

    console.log(`Conectado como ${client.user.username}`)
}
