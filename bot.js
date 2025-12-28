const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';

const app = express();
const bot = new TelegramBot(TOKEN, { polling: true });

/**
 * /start
 */
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    '🎉 Ваш промокод активирован!\n\nПользуйся на здоровье 🛍️🩷'
  );
});

/**
 * Render health check
 */
app.get('/', (_, res) => {
  res.send('Bot is alive');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running');
});
