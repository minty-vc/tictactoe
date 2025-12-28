const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';

const bot = new TelegramBot(TOKEN, { polling: true });

const app = express();
app.use(cors());
app.use(express.json());

// хранится последний промокод
let lastPromoCode = null;

/**
 * фронт присылает промокод после победы
 */
app.post('/promo', (req, res) => {
  const { promo } = req.body;

  if (!promo) {
    return res.status(400).json({ error: 'promo missing' });
  }

  lastPromoCode = promo;
  console.log('Promo received:', promo);

  res.json({ ok: true });
});

/**
 * команда /start в Telegram
 */
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  if (lastPromoCode) {
    bot.sendMessage(
      chatId,
      `🎉 Вот твой промокод: ${lastPromoCode}\nИграй ещё, чтобы получить больше промокодов!`
    );
    lastPromoCode = null;
  } else {
    bot.sendMessage(chatId, 'Попробуй нашу игру! ❤️🌸');
  }
});

app.get('/', (_, res) => {
  res.send('Bot is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
