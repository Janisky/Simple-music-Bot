const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "skip",
    description: "Saltar la cancion actual",
    options: [
        {
            name: "cantidad",
            description: "Saltar la cantidad de canciones",
            type: ApplicationCommandOptionType.Number,
            required: false
        }
    ],
    voiceChannel: true,
    run: async (client, interaction) => {
        try {
            const queue  = client.player.getQueue(interaction.guildId);
            if (!queue || !queue.playing) return interaction.reply({ content: "No hay nada reproduciendose", ephemeral: true }).catch(e => { })

            let number = interaction.options.getNumber('cantidad')
            if (number) {
                if (!queue.songs.length > number ) return interaction.reply({content: "No hay nada que saltar", ephemeral: true}).catch(e => { })
                if (isNaN(number)) return interaction.reply({content: "No es un numero valido", ephemeral: true}).catch(e => { })
                if (1 > number ) return interaction.reply({content: "No es un numero valido", ephemeral: true}).catch(e => { })

                try {
                    let old = queue.songs[0]
                    await client.player.jump(interaction, number).then(song => {
                        return interaction.reply({ content: `Saltando a la cancion ${old.name}` }).catch(e => { })
                    })
                } catch (e) {
                    console.log(e)
                    return interaction.reply({ content: `Se genero un error, revisar consola, skip 1`}).catch(e => { })
                }
            } else {
                try {
                    let old = queue.songs[0]
                    const sucess = await queue.skip()
                    return interaction.reply({ content: sucess ? `Saltando a la cancion: **${old.name}**`: 'Cancion saltada' }).catch(e => { })
                } catch (e) {
                    console.log(e)
                    return interaction.reply({ content: `No hay mas canciones que saltar.`, ephemeral: true }).catch(e => { })
                }
            }
        } catch (e) {
            console.log(e)
            return interaction.reply({ content: `Se genero un error, revisar consola, skip 3`, ephemeral: true }).catch(e => { })
        }
    },
};