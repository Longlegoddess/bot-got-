const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const TOKEN = process.env.TOKEN;
const ROLE_ID = "1474567355941126196";
const CHANNEL_ID = "1439683908202397877";
const MESSAGE_ID = "1439684602196398242";

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  if (reaction.message.id === MESSAGE_ID && reaction.message.channel.id === CHANNEL_ID) {
    const member = await reaction.message.guild.members.fetch(user.id);
    await member.roles.add(ROLE_ID);
    console.log(`Added role to ${user.tag}`);
  }
});

client.login(TOKEN);
