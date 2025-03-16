require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("serverip")
    .setDescription("Displays the global Minecraft server IP addresses."),

  new SlashCommandBuilder()
    .setName("donate")
    .setDescription("Provides the donation link to help with server costs."),

  new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Displays the rules for the VLR Minecarft server."),

  new SlashCommandBuilder()
    .setName("modhelp")
    .setDescription("Alerts moderators that help is needed.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user who needs help")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔄 Refreshing slash commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: [],
    });
    console.log("✅ Successfully removed existing commands!");
    console.log("🔄 Registering new slash commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("✅ Successfully registered commands!");
  } catch (error) {
    console.error("❌ Failed to register commands:", error);
  }
})();
