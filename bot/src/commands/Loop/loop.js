import { SlashCommandBuilder } from 'discord.js';
import { QueueRepeatMode, useQueue } from 'discord-player';

export const data = new SlashCommandBuilder()
    .setName('loop') // Command name
    .setDescription('Loop the queue in different modes') // Command description
    .addNumberOption((option) =>
        option
            .setName('mode') // Option name
            .setDescription('The loop mode') // Option description
            .setRequired(true) // Option is required
            .addChoices(
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: 'Track',
                    value: QueueRepeatMode.TRACK,
                },
                {
                    name: 'Queue',
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: 'Autoplay',
                    value: QueueRepeatMode.AUTOPLAY,
                },
            ),
    );

export async function run({ interaction, client, handler }) {
    // Get the loop mode
    const loopMode = interaction.options.getNumber('mode');

    // Get the current queue
    const queue = useQueue(interaction.guild);

    if (!queue) {
        return interaction.reply(
            'This server does not have an active player session.',
        );
    }

    // Set the loop mode
    queue.setRepeatMode(loopMode);

    const loopModeName = Object.keys(QueueRepeatMode).find(key => QueueRepeatMode[key] === loopMode);

    // Send a confirmation message
    return interaction.reply(`Loop mode set to ${loopModeName.charAt(0).toUpperCase() + loopModeName.slice(1).toLowerCase()}.`);
}