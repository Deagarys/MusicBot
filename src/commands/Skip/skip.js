import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const data = new SlashCommandBuilder()
    .setName('skip') // Command name
    .setDescription('Skip the currently playing song'); // Command description

export async function run({ interaction, client, handler }) {
    // Get the current queue
    const queue = useQueue(interaction.guild);

    if (!queue) {
        return interaction.reply(
            'This server does not have an active player session.',
        );
    }

    if (!queue.isPlaying()) {
        return interaction.reply('There is no track playing.');
    }

    // Skip the current track
    queue.node.skip();

    // Send a confirmation message
    return interaction.reply('The current song has been skipped.');
}