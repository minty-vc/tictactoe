const TelegramBot = require('node-telegram-bot-api');
 
const TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';
const bot = new TelegramBot(TOKEN, { polling: true });
 
// /start с параметром
bot.onText(/\/start(?:\s+promo_(\d{5}))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const promo = match?.[1];
 
  if (promo) {
    bot.sendMessage(
      chatId,
      `🎉 Победа!\nПромокод выдан: ${promo}`
    );
  } else {
    bot.sendMessage(
      chatId,
      'Привет! 🌸\nСыграй в игру и получи промокод 💕'
    );
  }
});
