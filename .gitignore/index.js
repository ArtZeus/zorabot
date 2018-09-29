const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = ";";

client.login("NDg1MTk1MTA2MDg2MDI3Mjk1.Dmy2Og.jsKftlKqtOGIbjsMXERSp8PsfAc");

client.on("ready", () => {
    console.log("Le robot est prêt");
    client.user.setActivity("https://bit.ly/2ozg3HW");
});

client.on('message', message => {

    if(message.content == ";test"){
    message.reply("C'est un test");
    console.log('Le bot dit test');
    }

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#990000")
        .setTitle("Commandes")
        .addField(";help", "Commandes du bot.")
        .addField(";info", "Avoir des informations sur une personne.")
        .addField(";bi", "Avoir des informations sur le bot et le serveur.")
        .addField(";kick", "Permet de kick une personne.")
        .addField(";ban", "Permet de bannir une personne.")
        .addField(";clear", "Permet de clear un tchat.")
        .addField(";mute", "Permet de mute une personne.")
        .addField(";unmute", "Permet de unmute une personne.")
        .addField(";w", "Permet de warn une personne.")
        .addField(";chw", "Permet de regarder les warns d'une personne.")
        .addField(";dw", "Permet de supprimer les warns d'une personne.")




        .setFooter("Menu help")
        message.channel.send(help_embed);
        console.log("La commande help a été utilisé")
    }
/// COMMANDES HELP
    if(message.content === prefix + "bi") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#990000")
        .setTitle("Informations sur le bot et le serveur.")
        .addField(" Nom :", `${client.user.tag}`, true)
        .addField("Hashtag du bot", `#${client.user.discriminator}`)
        .addField("ID : ", `${client.user.id}`)
        .addField("Total de membres", message.guild.members.size)
        .addField("Total de catégorie/salons", message.guild.channels.size)
        .addField("Région", message.guild.region)
        .addField("Fondateur", message.guild.owner)

        .setFooter("Menu infobot")
        message.channel.sendMessage(info_embed)
        console.log("Un client à éffectué la commande botinfo")
    }
/// KICK
    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas la permission.");
        if(message.mentions.users.size === 0) {
            return message.channel.send("[ERREUR] Tu dois mentionner un client.")

            }
            var kick = message.guild.member(message.mentions.users.first());
            if(!kick) {
                return message.channel.send("[ERREUR] L'utilisateur ne semble pas exister.")

            }

            if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
                return message.channel.send("[ERREUR] Je n'ai pas la permission de kick.");
            }

            kick.kick().then(member => {
                message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);

            });
        }
/// BAN
        if(message.content.startsWith(prefix + "ban")) {
            if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");

            if(message.mentions.users.size === 0) {
                return message.channel.send("[ERREUR] Tu dois mentionner un client.")
            }

            var bab = message.guild.member(message.mentions.users.first());
            if(!ban) {
                return message.channel.send("[ERREUR] L'utilisateur ne semble pas exister.")
            }

            if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
                return message.channel.send("[ERREUR] Je n'ai pas la permission de ban.");
            }
            ban.ban().then(member => {
                message.channel.send(`${member.user.username} a été banni par ${message.author.username}`)
            }

            )
        }
/// CLEAR
        if(message.content.startsWith(prefix + "clear")) {
            if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission");

            let args = message.content.split(" ").slice(1);

            if(!args[0]) return message.channel.send("[ERREUR] Tu dois préciser un nombre de message à supprimer.")
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} messages ont été supprimés.`);
            })
        }
/// MUTE
        if(message.content.startsWith(prefix + "mute")) {
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
     
            if(message.mentions.users.size === 0) {
                return message.channel.send('[ERREUR] Tu dois mentionner un client.');
            }
     
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.channel.send("[ERREUR] L'utilisateur ne semble pas exister.");
            }
     
            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("[ERREUR] Je n'ai pas la permission de ban.");
            message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
                message.channel.send(`${mute.user.username} est mute !`);
            })
        }
/// UNMUTE
        if(message.content.startsWith(prefix + "unmute")) {
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
     
            if(message.mentions.users.size === 0) {
                return message.channel.send('[ERREUR] Tu dois mentionner un client.');
            }
     
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.channel.send("[ERREUR] L'utilisateur ne semble pas exister.");
            }
     
            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("[ERREUR] Je n'ai pas la permission de ban.");
            message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
                message.channel.send(`${mute.user.username} n'est plus mute !`);
            })
        }

/// WARN

var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "w")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("** Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("** Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"w <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"w <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"w <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"chw")||message.content===prefix+"chw") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn ");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("[ERREUR] mauvais usage: "+prefix+"chw <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("[ERREUR] mauvais usage: "+prefix+"chw <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("[ERREUR] Vous n'avez pas la permission `Gérer le serveur` dans ce serveur.");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"dw")||message.content===prefix+"dw") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("[ERREUR] Vous n'avez pas la permission `Gérer le serveur` dans ce serveur.").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("[ERREUR] Ce warn n'existe pas");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de ${mentioned.tag}\': ${args[1]} a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de ${mentioned.tag} a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("[ERREUR] mauvais usage: "+prefix+"cw <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("[ERREUR] mauvais usage: "+prefix+"cw <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("[ERREUR] mauvais usage: "+prefix+"cw <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("[ERREUR] Vous n'avez pas la permission `Gérer le serveur` dans ce serveur");
 
    }
 
  }

/// userinfo
    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLocaleLowerCase()) {
        case "info":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#990000")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID du client :`, msgauthor, true)
        .addField("Date de création du client :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Informations reçu en privé.")
        message.author.send({embed: stats_embed});
        break;
    }
});
