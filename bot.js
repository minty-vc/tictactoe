const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';

const app = express();
const bot = new TelegramBot(TOKEN, { polling: true });

/**
 * /start и /start promo_XXXX
 */
bot.onText(/\/start(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const payload = match && match[1];

  // Если есть промокод
  if (payload && payload.startsWith('promo_')) {
    const promo = payload.replace('promo_', '');

    bot.sendMessage(
      chatId,
      `🎉 Умница!\n\nВот твой промокод: *${promo}*\n\nИграй ещё, чтобы получить больше промокодов 💖`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Обычный старт
  bot.sendMessage(
    chatId,
    'Попробуй нашу игру 🎮\n\nВыиграй — получи промокод 💝'
  );
});

/**
 * Endpoint для Render (чтобы сервис считался живым)
 */
app.get('/', (req, res) => {
  res.send('Bot is alive');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
