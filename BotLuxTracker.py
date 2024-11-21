from telegram import Update, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

# Ваш токен от BotFather
TOKEN = "8154972070:AAGuDUu3_EVQeb6sQ4CZAABjNl2ebbeBAzg"

# URL вашего WebApp
WEB_APP_URL = "https://Anrash89.github.io/Tracker"

# Обработчик команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [KeyboardButton(text="Открыть приложение", web_app={"url": WEB_APP_URL})]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await update.message.reply_text(
        "Добро пожаловать! Нажмите кнопку ниже, чтобы открыть приложение:",
        reply_markup=reply_markup,
    )

# Основной запуск
def main():
    # Создаём приложение
    application = Application.builder().token(TOKEN).build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота
    print("Бот запущен!")
    application.run_polling()

if __name__ == "__main__":
    main()
