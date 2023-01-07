const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "play",
    description: "Reproduce una cancion o Spotify",
    options: [
        {
            name: "song",
            description: "idk",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "name",
                    description: "Nombre de la cancion, link del video o Spotify",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
    ],
    voiceChannel: true,
    run: async (client, interaction) => {
        try {
            let stp = interaction.options.getSubcommand()

            if (stp === "song") {
                const name = interaction.options.getString('name')
                if (!name) return interaction.reply({ content: 'Debe de tener un link o nombre a buscar.', ephemeral: true }).catch(e => { })

                await interaction.reply({ content: `idk`, ephemeral: true }).catch(e => { })
                try {
                    await client.player.play(interaction.member.voice.channel, name, {
                        member: interaction.member,
                        textChannel: interaction.channel,
                        interaction
                    })
                } catch (e) {
                    console.log(e)
                    await interaction.editReply({ content: 'Se genero un error, error 1', ephemeral: true }).catch(e => { })
                }
            }
        } catch (e) {
            console.log(e)
            return interaction.editReply({ content: `Se genero un error, error 2`, ephemeral: true }).catch(e => { })
        }
    },
};