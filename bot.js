var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var exec = require('child_process').execFile;
var runq2 = function(){
        exec('./D:/games/q2pro-server/q2proded.exe', function(err, data) { 
			console.log(err)
			console.log(data.toString())
		})
}
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected')
    logger.info('Logged in as: ' + bot.username + ' - (' + bot.id + ')')
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    bot.sendMessage({
                    to: channelID,
                    message: 'Q2bot at your service'
       		});
	if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            // !startsrv
            case 'startsrv':
			bot.sendMessage({
                    to: channelID,
                    message: 'Starting Q2server'
       		});
			runq2();
		    break;
            // Just add any case commands if you want to..
		}
	}
});
