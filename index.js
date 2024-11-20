// made by: RANDALL :) ig: @lstrndg

var cron = require("node-cron");
require("dotenv").config();
const express = require("express");
const app = express();
const token = process.env.DISCORD_TOKEN;
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

app.get("/", (req, res) => {
    res.send("Bot is running!");
});

app.listen(3000, () => {
    console.log("Web server is running on port 3000");
});

let index = 0;
let cachedPinnedMessages = [];

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = client.channels.cache.get("1138119404920520744");

    if (channel) {
        channel
            .send(
                `\n**Quote of the Day** \n\n " **${"Unsaon manang lolipop kung saimo ko mo tilap? rawr "}** " - ${"KALOY"}`,
            )
            .then((message) => {
                message.pin().catch((err) => {
                    console.error("Failed to pin the message:", err);
                });
            });
    }

    cron.schedule(
        "0 0 * * *",
        () => {
            if (channel) {
                if (cachedPinnedMessages.length === 0) {
                    channel.messages
                        .fetchPinned()
                        .then((pinnedMessages) => {
                            cachedPinnedMessages = pinnedMessages;
                            pinnedMessages.forEach((msg) => {
                                msg.unpin().catch((err) =>
                                    console.error(
                                        "Failed to unpin message:",
                                        err,
                                    ),
                                );
                            });

                            const devilQuotes = [
                                {
                                    author: "RANDALL",
                                    quote: "Sa mundong puno ng kalungkutan, pwede ba tayo magkantonan?",
                                },
                                {
                                    author: "KINDOLL",
                                    quote: "Kung si Jose Rizal tinamaan sa Likod, Ikaw tatamaan sa akin patalikod!",
                                },
                                {
                                    author: "RICO",
                                    quote: "Kung ang damit mo ay maitim, pwede patingen kung malalim?",
                                },
                                {
                                    author: "SAMAEL",
                                    quote: "TINOTNAK NI TITO ANG TIKTAK NI NENE",
                                },
                                {
                                    author: "MANUG",
                                    quote: "Kung ang bisaya sa duck ay pato, PATOTOYA KO BI?",
                                },
                                {
                                    author: "Tweight",
                                    quote: "Kung ang english sa bubuyog ay BEE, pa kiss ko BEE?",
                                },
                            ];

                            const message =
                                devilQuotes[index % devilQuotes.length];
                            channel
                                .send(
                                    `\n**Quote of the Day** \n\n " **${message.quote}** " - ${message.author}`,
                                )
                                .then((message) => {
                                    message.pin().catch((err) => {
                                        console.error(
                                            "Failed to pin the message:",
                                            err,
                                        );
                                    });
                                    index++;
                                });
                        })
                        .catch((err) =>
                            console.error(
                                "Failed to fetch pinned messages:",
                                err,
                            ),
                        );
                }
            }
        },
        { scheduled: true, timezone: "Asia/Manila" },
    );
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const isMentioned = message.mentions.has(client.user);
    if (!isMentioned) return;

    const member = message.guild.members.cache.get(message.author.id);
    const userName = member ? member.displayName : message.author.username;

    const greetings = [
        {
            patterns: [
                "tanginaka",
                "tanginamo",
                "bobo",
                "yawa",
                "gago",
                "bugok",
                "bogok",
                "pisti",
                "piste",
                "vovo",
                "fuckyou",
                "pak u",
                "pakyu",
                "pakyo",
                "ulol",
                "ulul",
                "inutil",
                "boang",
                "buang",
                "shit",
                "sht",
                "tarantado",
                "TANGA",
                "voang",
            ],
            response: () => `ULOL KA @**${userName}**`,
        },
        {
            patterns: [
                "hi",
                "hello",
                "maayong bungkag",
                "wazzup",
                "wazzap",
                "wus good",
                "wus",
                "wus good in da hood",
            ],
            response: (cleanMessage) => `${cleanMessage} din, @**${userName}**`,
        },
        {
            patterns: ["sapat", "enough"],
            response: () => `Unfortunately NO :) @**${userName}**`,
        },
        {
            patterns: ["bata"],
            response: () =>
                `Si **AMORA** lang yung bata dito paps! @**${userName}**`,
        },
        {
            patterns: ["kindoll", "mystogan"],
            response: () =>
                `Bading at Babaero yan si **KINDOLL** paps @**${userName}**`,
        },
        {
            patterns: ["kupal"],
            response: () => `Mas kupal ka boss @**${userName}** ulol`,
        },
        {
            patterns: ["mahal"],
            response: () =>
                `Hinde ka mahal non boss legit no cuh @**${userName}**`,
        },
        {
            patterns: ["crush"],
            response: () =>
                `Hinde ka nga crush non boss kulit mo hibang kaba? @**${userName}**`,
        },
        {
            patterns: [
                "kumain kanaba?",
                "kumain ka na?",
                "kumain kana?",
                "kumain ka na ba?",
            ],
            response: () =>
                `Hindi pa boss ililibre mo ba ako? @**${userName}**`,
        },
        {
            patterns: ["bading", "bakla", "gae", "gay"],
            response: () =>
                `Si **KINDOL** lang bading dito paps @**${userName}**`,
        },
        {
            patterns: ["samael", "mael"],
            response: () => `Fake ANGEL yan si **SAMAEL** paps!`,
        },
        {
            patterns: ["bagums", "bagums!"],
            response: () => `BAGUMS TALAGA PAPS! @**${userName}**`,
        },
        {
            patterns: ["tirada"],
            response: () => `Wa lage rugby! @**${userName}**`,
        },
        {
            patterns: ["suntokan", "suntukan", "sparring", "sparing"],
            response: () =>
                `Siga mo paps, Kompleto naba buto mo? @**${userName}**`,
        },
        {
            patterns: ["mabait"],
            response: () =>
                `Si **RANDALL** lang mabait dito paps! @**${userName}**`,
        },
        {
            patterns: ["zeldris", "kaloy"],
            response: () => `Salbahis yan si **KALOY** paps! @**${userName}**`,
        },
        {
            patterns: ["randall"],
            response: () =>
                `Mabait, Matino, Faithfull yan si **RANDALL** boss no cuh`,
        },
        {
            patterns: [
                "goodnight",
                "paalam",
                "bye",
                "byebye",
                "goodbye",
                "gudnite",
                "goodmornight",
            ],
            response: () => `ingat paps @**${userName}**`,
        },
    ];

    const messageContent = message.content
        .replace(/<@!?(\d+)>/g, "")
        .trim()
        .toLowerCase();

    console.log("Processed message content: ", messageContent);

    for (const { patterns, response } of greetings) {
        if (patterns.some((pattern) => messageContent.includes(pattern))) {
            const regex = new RegExp(`(${patterns.join("|")})`, "i");
            if (regex.test(messageContent)) {
                const cleanMessage = message.content
                    .replace(/<@!?(\d+)>/g, "")
                    .trim();
                const reply = response(cleanMessage);
                message.channel.send(reply);
                return;
            }
        }
    }
});

client.login(token);
