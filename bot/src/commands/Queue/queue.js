import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const data = new SlashCommandBuilder()
    .setName('queue') // Command name
    .setDescription('Display the current queue'); // Command description

export async function run({ interaction, client, handler }) {
    // Get the current queue
    const queue = useQueue(interaction.guild);

    if (!queue) {
        return interaction.reply(
            'This server does not have an active player session.',
        );
    }

    // Get the current track
    const currentTrack = queue.currentTrack;

    // Get the upcoming tracks
    const upcomingTracks = queue.tracks.data.slice(0, 5);

    // Create a message with the current track and upcoming tracks
    const message = [
        `**Now Playing:** ${currentTrack.title} - ${currentTrack.author}`,
        '',
        '**Upcoming Tracks:**',
        ...upcomingTracks.map(
            (track, index) => `${index + 1}. ${track.title} - ${track.author}`,
        ),
    ].join('\n');

    // Send the message
    return interaction.reply(message);
}