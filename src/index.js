import 'dotenv/config';

import { Client, IntentsBitField } from 'discord.js';
import { CommandKit } from 'commandkit';

import { dirname as dn } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Player, GuildQueueEvent } from 'discord-player';
import { DefaultExtractors, SpotifyExtractor } from '@discord-player/extractor';
import { DeezerExtractor } from "discord-player-deezer"
import { YoutubeiExtractor } from "discord-player-youtubei"

const dirname = dn(fileURLToPath(import.meta.url));

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
});

new CommandKit({
    client,
    eventsPath: `${dirname}/events`,
    commandsPath: `${dirname}/commands`,
    bulkRegister: true,
});

(async () => {
    try {
        await client.login(process.env.TOKEN);
    } catch (e) {
        console.log(e);
    }
})();

const player = new Player(client);
await player.extractors.register(DeezerExtractor, { decryptionKey: process.env.DEEZER_KEY });

await player.extractors.loadMulti([SpotifyExtractor, DeezerExtractor, YoutubeiExtractor, DefaultExtractors]);


// Handle the event when a track starts playing
player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
  // Get the metadata stored on the queue
  const { channel } = queue.metadata;
  // Send a message to the channel
  await channel.send(`Now playing: ${track.title}`);
});
 
// Handle the event when a track finishes playing
player.events.on(GuildQueueEvent.PlayerFinish, async (queue, track) => {
  // Get the metadata stored on the queue
  const { channel } = queue.metadata;
  // Send a message to the channel
  await channel.send(`Finished playing ${track.title}`);
});