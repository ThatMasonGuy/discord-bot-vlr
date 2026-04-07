# VLR Discord Bot

A lightweight Discord bot for the VLR Minecraft community, built with [discord.js](https://discord.js.org/).

## Features

This bot provides four slash commands:

- `/serverip` — Shares regional Minecraft server IP addresses (US, EU, AU).
- `/donate` — Shares the PayPal donation link for server costs.
- `/rules` — Posts the VLR Minecraft server rules.
- `/modhelp user:@member` — Tags moderators to help a specific user.

## Tech Stack

- Node.js
- discord.js v14
- dotenv

## Project Structure

- `index.js` — Main bot runtime, interaction handling, and command registration on startup.
- `deploy-commands.js` — Utility script to refresh global slash commands.
- `package.json` — Dependencies and npm metadata.

## Prerequisites

- Node.js 18+ recommended
- A Discord application + bot token
- Your Discord application client ID

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the repository root:

   ```env
   TOKEN=your_discord_bot_token
   CLIENT_ID=your_discord_application_client_id
   ```

## Register Slash Commands

You can register commands in either of these ways:

- Automatically when starting the bot (`index.js` does this on `ready`), or
- Manually with:

  ```bash
  node deploy-commands.js
  ```

## Run the Bot

```bash
node index.js
```

If successful, you should see a login message and slash-command registration logs in the console.

## Notes

- Commands are registered as **global application commands**, which may take a short time to propagate.
- Keep your `.env` file private and never commit bot credentials.
