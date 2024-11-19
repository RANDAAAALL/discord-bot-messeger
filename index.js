
// made by: RANDALL

var cron = require('node-cron');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const devilQuotes = [
    {
        author: "Hama Tuma",
        quote: "Better the devil you know than the angel you don't."
    },
    {
        author: "Oscar Wilde",
        quote: "We are each our own devil, and we make this world our hell."
    },
    {
        author: "Jonah Goldberg",
        quote: "If power made one evil, then God would be the devil."
    },
    {
        author: "Anne Rice",
        quote: "Don't be a fool for the Devil, darling."
    },
    {
        author: "Jonathan Winters",
        quote: "God is in my head, but the devil is in my pants."
    },
    {
        author: "Rick Warren",
        quote: "Every time you forgive you disappoint the devil."
    },
]

let index = 0;

client.once('ready', () => {

    cron.schedule('* * * * *', () => {

        const channel = client.channels.cache.get('1302698332715483167'); 
        
        if(channel){
            const message = devilQuotes[(index+1) % devilQuotes.length];
            channel.send(`**Word of the Day** \n\n "**${message.quote}**" - ${message.author}`);
        }
    },
        {
            scheduled: true,
            timezone: "Asia/Manila"

    });
  });
  
client.login(token);
