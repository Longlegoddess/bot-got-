const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
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
            content: `Welcome to the smoke-Circle ${member}`,
            files: ["https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHZpY21icnB2ZzN2ZmJ2dnJzZWl5ZTF6NzdtOWhiNTZrMDByMXd3YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o85xAqcGm4rV1Ig5W/giphy.gif"]
        });
        }
    }
});

client.login(TOKEN);
