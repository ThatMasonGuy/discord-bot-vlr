require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
} = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("✅ v3 Slash commands registered successfully!");
  } catch (error) {
    console.error("Failed to register commands:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "serverip":
      await interaction.reply({
        content: `🌍 **This Minecraft server is set up to run globally with low latency.**  
Please use the IP closest to you:  
🇺🇸 US: \`US.play.mxn.au\`  
🇪🇺 EU: \`EU.play.mxn.au\`  
🇦🇺 AU: \`AU.play.mxn.au\``,
        ephemeral: false,
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

    case "rules":
      await interaction.reply({
        content: `📃 **VLR Minecraft Server Rules**  
        1. **VLR Exclusive Server.** This server is for VLR members only, however you may invite one guest.  
        2. **No griefing or stealing.** This includes taking items from other players without permission.  
        3. **No hacking or cheating.** This includes using mods or hacks that give you an unfair advantage.  
        4. **No spamming or trolling.** This includes excessive use of chat or actions that disrupt the game for others.  
        5. **Respect all players.** Treat others as you would like to be treated.  
        6. **Who are you?** Please use your Discord name or let us know what your username is.  
        7. **Have fun!** Enjoy your time on the server! Remember, it's just a game and none of the mods are paid.  
        8. **Report issues.** If you see a problem, let a mod know. We can't fix what we don't know about.`,
        ephemeral: false,
      });
      break;

    case "modhelp":
      const user = interaction.options.getUser("user");
      await interaction.reply({
        content: `🚨 **${user} needs help!**  
**@thatmasonguy** & **@funkyfroggy**, please assist.`,
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
