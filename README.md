# MusicBot

## Overview
MusicBot is a Discord bot that allows users to play music in their Discord servers. It supports various music sources and provides a range of commands to control playback.

## Features
- Play music from YouTube, Spotify, and other sources
- Queue management (add, remove, view queue)
- Playback controls (play, pause, skip, stop)
- Volume control
- User-friendly command interface

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/MusicBot.git
    ```
2. Navigate to the project directory:
    ```bash
    cd MusicBot
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and add your environment variables:
    ```env
    TOKEN=your_discord_bot_token
    DEEZER_KEY=your_deezer_key
    ```

## Usage
1. Start the bot:
    ```bash
    npm start
    ```
2. Invite the bot to your Discord server using the OAuth2 URL:
    ```url
    https://discord.com/oauth2/authorize?client_id=your_client_id&scope=bot&permissions=8
    ```
3. Use the bot commands in your Discord server to play music.

## Commands
- `/play <url>`: Play a song from the provided URL
- `/pause`: Pause the current song
- `/resume`: Resume the paused song
- `/skip`: Skip the current song
- `/stop`: Stop the playback and clear the queue
- `/queue`: Display the current queue
- `/volume <level>`: Set the volume level

## License
This project is licensed under the MIT License.

