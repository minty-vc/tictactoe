import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
 
const app = express();
app.use(express.json());
 
const PORT = process.env.PORT || 3000;
 
// ======================
// TELEGRAM BOT
// ======================
 
const BOT_TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';
 
const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});
 
let savedChatId = null;
 
// /start — сохраняем chat_id
bot.onText(/\/start/, (msg) => {
  savedChatId = msg.chat.id;
 
  bot.sendMessage(
    savedChatId,
    'Привет! 🌸\nПопробуй нашу игру! ❤️'
  );
 
  console.log('Saved chat_id:', savedChatId);
});
 
// ======================
// HTTP API
// ======================
 
// healthcheck для Render
app.get('/', (req, res) => {
  res.send('Bot is running');
});
 
// endpoint для победы
app.post('/send-promo', (req, res) => {
  const { promoCode } = req.body;
 
  if (!savedChatId) {
    return res.status(400).json({
      error: 'User has not pressed /start yet'
    });
  }
 
  if (!promoCode) {
    return res.status(400).json({
      error: 'promoCode is required'
    });
  }
 
  bot.sendMessage(
    savedChatId,
    `🎉 Победа!\nВот твой промокод: ${promoCode}\n\nИграй ещё, чтобы получить больше промокодов! 💖`
  );
 
  res.json({ success: true });
});
 
// ======================
// START SERVER
// ======================
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
