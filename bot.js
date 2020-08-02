const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')



const bot = new Telegraf('API-KEY')
bot.start((ctx) => ctx.reply('Hello. Willkommen bei mir, einem Telegram Bot. Schicke mir einen Amazon Produkt Link odeer eine ASIN ID und ich werde dir mit einem passendem Referal Link antworten.'))
bot.help((ctx) => ctx.reply('Sende mir einfach einen Amazon Link odeer eine ASIN ID!'))


bot.on('message', (ctx) => {
    var ASIN = [];
    ASIN=ctx.message.text.split('\n');
    ctx.telegram.sendMessage(ctx.from.id, refGen('REF-ID', ASIN))
})



bot.launch()



function refGen(ID, ASIN) {
var output='';

    for (var i = 0; i <= ASIN.length -1; i++) {
        if (ASIN[i].search("B0") != -1) {
            ASIN[i] = ASIN[i].substring(ASIN[i].search("B0"), ASIN[i].search("B0") +10);
        } else if (ASIN[i].search(/\d{10}/)) {
            ASIN[i] = ASIN[i].substring(ASIN[i].search(/\d{10}/), ASIN[i].search(/\d{10}/) +10);
        }
    }

    for (var i = 0; i <= ASIN.length - 1; i++) {
        console.log(ASIN[i]+','+ID);
        if (ASIN[i].length == 10 && (ASIN[i].search("B0") != -1 || ASIN[i].search(/\d{10}/) != -1 )) {
            var node='https://amazon.de/dp/'+ASIN[i]+'/?tag='+ID;
            output=output+'\n'+node;
        }
    }return output;
}