const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});

let botname = "Teszt bot"

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: !",
        "Készítő: Mr.Pingvin",
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(cmd === `${prefix}hello`){
        message.channel.send("Szia");
    }


    if(cmd === `${prefix}teszt`){
        let TesztEmbed = new Discord.MessageEmbed()
        .setColor("#98AA12")
        .setAuthor(message.author.username)
        .setTitle("Teszt Embed!")
        .addField("Irodalom:", "Líra\n Epika\n dráma")
        .setThumbnail(message.author.displayAvatarURL())
        .setImage(message.guild.iconURL())
        .setDescription(`\`${prefix}\``)
        .setFooter(`${botname} | ${message.createdAt}`)

        message.channel.send(TesztEmbed)
    }

    if(cmd === `${prefix}szöveg`){
        let szöveg = args.join(" ");

        if(szöveg) {
            let dumaEmbed = new Discord.MessageEmbed()
        .setColor("#98AA12")
        .setAuthor(message.author.username)
        .addField("Szöveg:", szöveg)
        .setFooter(`${botname} | ${message.createdAt}`)
    
        message.channel.send(dumaEmbed)
        } else {
            message.reply("írj szöveget!")
        }
    }

    /////////////////////////////////
    //// LOGIKAI OPERÁTOROK TIPP ////
    //////////////////////////////////////////////////////////
    //                                                      //
    //   || vagy , PL: if(X=1 || X=3)                       //
    //                                                      //
    //   && és , PL: if(X=5 && Y=3)                         //
    //                                                      //
    //   = sima egyenlő jel , PL: if(5=5)                   //
    //   ==  egyenlő jel , PL: if(X==5)                     //
    //   >= nagyobb vagy egyenő , PL: if(X >= 3)            //
    //   <= kisebb vagy egyenlő , PL: if(X <= 3)            //
    //   ! tagadás , PL if(X != 2)                          //
    //                                                      //
    //////////////////////////////////////////////////////////

    if(cmd === `${prefix}kick`){
        let kick_user = message.mentions.members.first();
        if(args[0] && kick_user){

            if(args[1]){

                let KickEmbed = new Discord.MessageEmbed()
                .setTitle("KICK")
                .setColor("RED")
                .setDescription(`**Kickelte:** ${message.author.tag}\n**Kickelve lett:** ${kick_user.user.tag}\n**Kick indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(KickEmbed);

                kick_user.kick(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek adj meg egy indokot!!")

            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek említs meg egy embert!")

            message.channel.send(parancsEmbed);

        }
    }

    if(cmd === `${prefix}ban`){
        let ban_user = message.mentions.members.first();
        if(args[0] && ban_user){

            if(args[1]){

                let BanEmbed = new Discord.MessageEmbed()
                .setTitle("BAN")
                .setColor("RED")
                .setDescription(`**Banolta:** ${message.author.tag}\n**Banolva lett:** ${kick_user.user.tag}\n**Ban indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(KickEmbed);

                ban_user.ban(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}ban <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek adj meg egy indokot!!")

            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}ban <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek említs meg egy embert!")

            message.channel.send(parancsEmbed);

        }
    }

    if(cmd === `${prefix}help`){
        let TesztEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(":mailbox_with_mail:|Parancsok")
        .setAuthor(message.author.username)
        .setTimestamp(message.createdAt)
        .setDescription("**:wrench:Moderátor:\n**`Ban Kick Töröl Ping Createcategory Createtext Createvoice Infó`\n\n **:rofl:Fun:**\n `Cica Kutya Gay Kor`\n\n **:page_with_curl:Általános:**\n `Invite Say Szavazás Számol Avatar Időjárás Report`\n\n **:video_game:Játékok:**\n `Kpo`\n\n **:slot_machine:Casino:**\n `Slot Work Pay`    ")        
        .setFooter("Használd a parancsokat **!** kezdéssel | " + bot.user.username, bot.user.displayAvatarURL())
    
        message.channel.send(TesztEmbed)
    
    }
    if(message.content.startsWith(prefix + "clear")) {
        message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Nincs permed! Szükséges perm: `MANAGE_MESSAGES`');
    if(!args[0]) return message.channel.send("Adj meg egy üzenet számot!");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Törlésre került: ${args[0]} üzenet ${message.author.username} által!`).then(async message => {
            setTimeout(() => message.delete(), 3000);
        });
    })};
    if(cmd === `${prefix}cat`){
        let msg = await message.channel.send("*Macska betöltése...*")

        let {body} = await superagent
        .get(`https://aws.random.cat/meow`)

        if(!{body}) return message.channel.send("A file betöltésekor hiba lépett fel!")

        let catEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField("Ugy milyen cuki?", ":3")
        .setImage(body.file)
        .setTimestamp(message.createdAt)
        .setFooter(botname)

        message.channel.send(catEmbed)
    }

    if(cmd === `${prefix}meme`){
        const subreddits = ["dankmeme", "meme", "me_irl"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]

        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(IMG)
        .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
        .setURL(`https://www.reddit.com/r/${random}`)

        message.channel.send(MemeEmbed)
    }

})




bot.login(process.env.BOT_TOKEN);
