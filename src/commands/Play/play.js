import { SlashCommandBuilder, PermissionsBitField } from "discord.js";
import { useMainPlayer } from 'discord-player';

export const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('play song')
    .addStringOption(
        (option) =>
            option
                .setName('song') // Option name
                .setDescription('The song to play') // Option description
                .setRequired(true), // Make the option required
    );

export async function run({ interaction, client, handler }) {
    const player = useMainPlayer();
    const query = interaction.options.getString('song');
    const voiceChannel = interaction.member.voice.channel;

    if (!isUserInVoiceChannel(interaction, voiceChannel)) return;
    if (isBotInDifferentVoiceChannel(interaction, voiceChannel)) return;
    if (!hasBotPermissionToJoin(interaction)) return;
    if (!hasBotPermissionToSpeak(interaction, voiceChannel)) return;

    try {
        await playSong(interaction, player, voiceChannel, query);
    } catch (error) {
        console.error(error);
        return interaction.reply('An error occurred while playing the song!');
    }
}

function isUserInVoiceChannel(interaction, voiceChannel) {
    if (!voiceChannel) {
        interaction.reply('You need to be in a voice channel to play music!');
        return false;
    }
    return true;
}

function isBotInDifferentVoiceChannel(interaction, voiceChannel) {
    if (interaction.guild.members.me.voice.channel &&
        interaction.guild.members.me.voice.channel !== voiceChannel) {
        interaction.reply('I am already playing in a different voice channel!');
        return true;
    }
    return false;
}

function hasBotPermissionToJoin(interaction) {
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Connect)) {
        interaction.reply('I do not have permission to join your voice channel!');
        return false;
    }
    return true;
}

function hasBotPermissionToSpeak(interaction, voiceChannel) {
    if (!interaction.guild.members.me.permissionsIn(voiceChannel).has(PermissionsBitField.Flags.Speak)) {
        interaction.reply('I do not have permission to speak in your voice channel!');
        return false;
    }
    return true;
}

async function playSong(interaction, player, voiceChannel, query) {
    const result = await player.play(voiceChannel, query, {
        nodeOptions: {
            metadata: { channel: interaction.channel }, // Store text channel as metadata on the queue
        },
    });

    interaction.reply(`${result.track.title} has been added to the queue!`);
}