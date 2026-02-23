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
const SMOKE_CHANNEL_ID = "1474682189701451776"
const MESSAGE_ID = "1439684602196398242";

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;

    if (
        reaction.message.id === MESSAGE_ID &&
        reaction.message.channel.id === CHANNEL_ID &&
        reaction.emoji.name === "✅"
    ) {
        const member = await reaction.message.guild.members.fetch(user.id);

        await member.roles.add(ROLE_ID);
        console.log(`Added role to ${user.tag}`);

        const smokeChannel = reaction.message.guild.channels.cache.get(SMOKE_CHANNEL_ID);

        if (smokeChannel) {
            smokeChannel.send({
    content: `💨✨ Welcome to the circle, ${member}!\n\nGrab a seat, light up, and make yourself at home.`,
    embeds: [
        {
            image: {
                url: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
            }
        }
    ]
});

client.login(TOKEN);
