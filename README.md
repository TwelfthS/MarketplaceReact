Проект в Школе 21 - маркетплейс.

## Инструкция по запуску (chapter 1):

В папке app запустите команду npm i, аналогично в папке app/backend. Запустите службу mysql, и в app/backend/config/config.json под development введите пользователя и пароль для mysql.

Находясь в папке app/backend запустите npm run dbr. Это создат базу данных и немного заполнит её.

Запустите node server.js для бекенда, и наконец в папке app - npm start

Незарегистрированные пользователи имеют доступ только к главной странице и страницам товаров. После регистрации можно добавлять товары в корзину, а на страничке корзины - создавать заказы, которые затем можно увидеть на странице Мои заказы.

Информация о заказах и корзине сохраняется при выходе и повторном входе в аккаунт.
