const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

bot.onText(/\/start(.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const payload = match[1].trim();

  if (payload.startsWith('promo_')) {
    const promo = payload.replace('promo_', '');
    bot.sendMessage(
      chatId,
      `🎉 Вот твой промокод: ${promo}\nИграй ещё, чтобы получить больше промокодов!`
    );
  } else {
    bot.sendMessage(chatId, 'Попробуй нашу игру! ❤️🌸');
  }
});

app.get('/', (_, res) => {
  res.send('Bot is alive');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running');
});
