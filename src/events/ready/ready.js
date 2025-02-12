import { ActivityType } from "discord.js";

export default (client) => {
    console.log(`✅ - ${client.user.tag} is online!`);

    client.user.setActivity({
        name: "Check out my makers streams!",
        type: ActivityType.Streaming,
        url: 'https://twitch.tv/deagarys'
    });
}