import { SlashCommandBuilder } from 'discord.js';
import { useQueue, useTimeline } from 'discord-player';

export const data = new SlashCommandBuilder()
    .setName('pause') // Command name
    .setDescription('Pause the currently playing song'); // Command description

export async function run({ interaction, client, handler }) {
    // Get the queue's timeline
    const timeline = useTimeline({
        node: interaction.guild,
    });

    if (!timeline) {
        return interaction.reply(
            'This server does not have an active player session.',
        );
    }

    // Invert the pause state
    const wasPaused = timeline.paused;

    wasPaused ? timeline.resume() : timeline.pause();

    // If the timeline was previously paused, the queue is now back to playing
    return interaction.reply(
        `The player is now ${wasPaused ? 'playing' : 'paused'}.`,
    );
}