module.exports = {
    name: 'shuffle',
    description: 'Mezcla la lista de reproduccion',
    voiceChannel: true,
    run: async (client, interaction) => {
        try {
            const queue = client.player.getQueue(interaction.guildId);
            if (!queue) return interaction.reply({ content: 'No hay cola en reproduccion', ephemeral: true }).catch(e => { })

            await queue.shuffle()
            interaction.reply({ content: 'La cola fue mezclada' })
        } catch (e) {
            console.log(e)
            return interaction.reply({ content: `Se genero un error, revisar consola, shuffle 1`, ephemeral: true }).catch(e => { })
        }
    }
}