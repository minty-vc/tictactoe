/**
 * Telegram bot + dummy HTTP server
 * Работает как Web Service на Render (free tier)
 */
 
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
 
// ==================
// HTTP SERVER (нужен Render)
// ==================
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.get('/', (req, res) => {
  res.send('Telegram bot is running');
});
 
app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
 
// ==================
// TELEGRAM BOT
// ==================
 
const BOT_TOKEN = process.env.BOT_TOKEN;
 
// защита от забывчивости
if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN is not defined');
  process.exit(1);
}
 
const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});
 
// сохраняем chat_id пользователя,
// который написал боту /start
let userChatId = null;
 
// команда /start
bot.onText(/\/start/, (msg) => {
  userChatId = msg.chat.id;
 
  bot.sendMessage(
    userChatId,
    'Привет! 🌸\nПопробуй нашу игру! ❤️'
  );
 
  console.log('User chat_id saved:', userChatId);
});
 
// ==================
// ОТПРАВКА ПРОМОКОДА
// ==================
 
/**
 * Вызывай эту функцию,
 * когда игрок победил в игре
 */
export function sendPromoCode(promoCode) {
  if (!userChatId) {
    console.warn('⚠️ Chat ID is not set yet');
    return;
  }
 
  bot.sendMessage(
    userChatId,
    `🎉 Победа!\nПромокод выдан: ${promoCode}`
  );
}
