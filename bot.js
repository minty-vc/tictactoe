const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0'; // временно можно хардкод
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start(.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const payload = match[1]?.trim();

  if (payload && payload.startsWith('promo_')) {
    const promoCode = payload.replace('promo_', '');

    bot.sendMessage(
      chatId,
      `🎉 Победа!\n\nВот твой промокод: ${promoCode}\n\nИграй ещё, чтобы получить больше 💖`
    );
  } else {
    bot.sendMessage(
      chatId,
      'Попробуй нашу игру 🎮\n\n👉 https://minty-vc.github.io/tictactoe/'
    );
  }
});

console.log('🤖 Telegram bot is running');
