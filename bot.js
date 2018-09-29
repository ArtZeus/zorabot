const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = ";";

client.login("NDg1MTk1MTA2MDg2MDI3Mjk1.Dmy2Og.jsKftlKqtOGIbjsMXERSp8PsfAc");

client.on("ready", () => {
    console.log("Le robot est prêt");
    client.user.setActivity("https://bit.ly/2ozg3HW");
});
