/**
 * Telegram bot + HTTP server
 * ВРЕМЕННО: токен захардкожен
 */
 
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
 
// ==================
// HTTP SERVER (для Render)
// ==================
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.get('/', (req, res) => {
  res.send('Bot is running');
});
 
app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
 
// ==================
// TELEGRAM BOT
// ==================
 
const BOT_TOKEN = '8535903290:AAHU0RC-WEPiuCJVhADRA7hp81BndRWZre0';
 
const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});
 
let userChatId = null;
 
bot.onText(/\/start/, (msg) => {
  userChatId = msg.chat.id;
 
  bot.sendMessage(
    userChatId,
    'Привет! 🌸\nПопробуй нашу игру! ❤️'
  );
 
  console.log('Saved chat_id:', userChatId);
});
 
// ==================
// ОТПРАВКА ПРОМОКОДА
// ==================
 
function sendPromoCode(promoCode) {
  if (!userChatId) {
    console.log('Chat ID not set');
    return;
  }
 
  bot.sendMessage(
    userChatId,
    `🎉 Победа!\nПромокод выдан: ${promoCode}`
  );
}
 
// временно экспорт не нужен, но оставим
export { sendPromoCode };
