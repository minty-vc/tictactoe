import express from 'express';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
app.use(express.json());

const bot = new TelegramBot(
  '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0',
  { polling: true }
);

let chatId = null;

bot.onText(/\/start/, msg => {
  chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Попробуй нашу игру! ❤️');
});

app.post('/send-promo', (req, res) => {
  if (!chatId) return res.sendStatus(400);
  bot.sendMessage(
    chatId,
    `Вот твой промокод: ${req.body.promoCode}\nИграй ещё! 💖`
  );
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000);
