# СИСТЕМА РАЗРАБОТКИ И ПРОХОЖДЕНИЯ ОНЛАЙН-КУРСОВ МАГИЧЕСКИХ ДИСЦИПЛИН 

***Содержание:***
- [Введение](#introduction)
- [Установка](#Install)

*Выполнила: ст. группы ИСПсп-119* 
***Антипина А.В.***

## Введение <a name="introduction"></a>
Данная система была разработана для знакомства с *магическим* миром

## Установка <a name="Install"></a>
1. Клонируйте репозиторий с помощью команды:
> ```git clone https://github.com/Antip-An/hogwarts_bac.git```
2. Откройте папку *back* с помощью команды: 
>```cd backend_hogwarts``` 
3. Выполнение комунду для установки зависимостей:
>```npm install```
4. Создайте файл *.env* и напишите в него следующие данные:
```
DB_HOST='_' // string
DB_PORT=_ // integer
DB_USERNAME='_' // string
DB_PASSWORD='_' // string
DB_DATABASE='_' // string

PORT='_' // string
JWT_SECRET_KEY="_" string
```
5. Запустите миграцию командой 
>```knex migrate:up```
6. Заполните БД данными с помощбю команды 
>```knex seed:run```