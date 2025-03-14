require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
} = require("discord.js");

// Create the bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define the slash commands
const commands = [
  new SlashCommandBuilder()
    .setName("serverip")
    .setDescription("Displays the global Minecraft server IP addresses."),

  new SlashCommandBuilder()
    .setName("donate")
    .setDescription("Provides the donation link to help with server costs."),

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

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);

  // Register slash commands
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("✅ v2 Slash commands registered successfully!");
  } catch (error) {
    console.error("Failed to register commands:", error);
  }
});

// Command Handling
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "serverip":
      await interaction.reply({
        content: `🌍 **This Minecraft server is set up to run globally with low latency.**  
Please use the IP closest to you:  
🇺🇸 US: \`66.94.98.250\`  
🇪🇺 EU: \`207.180.236.54\`  
🇦🇺 AU: \`46.250.243.60\``,
        ephemeral: false, // Set to true if you want only the user to see it
      });
      break;

    case "donate":
      await interaction.reply({
        content: `💖 **Thank you for helping chip in with server running costs!**  
They can be quite costly, so any support is appreciated. Click below to donate:  
[Donate via PayPal](https://www.paypal.com/donate/?business=T6SWYMTY376YW&no_recurring=0&item_name=Chip+in+for+the+VLR+Minecraft+Server%2C+it's+%2450+USD+monthly+to+keep+it+up+and+running.+No+expectations%2C+just+if+you+want+to+help&currency_code=USD)`,
        ephemeral: false,
      });
      break;

    case "modhelp":
      const user = interaction.options.getUser("user");
      await interaction.reply({
        content: `🚨 **${user} needs help!**  
**<@thatmasonguy>** & **<@funkyfroggy>**, please assist.`,
        ephemeral: false,
      });
      break;

    default:
      await interaction.reply("Unknown command.");
      break;
  }
});

// Log in to Discord
client.login(process.env.TOKEN);
