/**
 * Telegram bot + HTTP API
 * Работает как Web Service на Render (free tier)
 */
 
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
 
// ==================
// CONFIG
// ==================
 
const BOT_TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';
const PORT = process.env.PORT || 3000;
 
// ==================
// HTTP SERVER
// ==================
 
const app = express();
app.use(express.json());
 
app.get('/', (req, res) => {
  res.send('Bot is running');
});
 
// endpoint, который дергает фронт при победе
app.post('/win', (req, res) => {
  const { promoCode } = req.body;
 
  if (!userChatId) {
    return res.status(400).json({ error: 'Chat ID not set' });
  }
 
  bot.sendMessage(
    userChatId,
    `🎉 Победа!\nПромокод выдан: ${promoCode}`
  );
 
  res.json({ status: 'ok' });
});
 
app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
 
// ==================
// TELEGRAM BOT
// ==================
 
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
 
let userChatId = null;
 
bot.onText(/\/start/, (msg) => {
  userChatId = msg.chat.id;
 
  bot.sendMessage(
    userChatId,
    'Привет! 🌸\nПопробуй нашу игру! ❤️'
  );
 
  console.log('Saved chat_id:', userChatId);
});
