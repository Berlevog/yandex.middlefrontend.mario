# yandex.middlefrontend.mario

_Командный проект 5-9 спринта_

[![build-test](https://github.com/Berlevog/yandex.middlefrontend.mario/actions/workflows/actions.yml/badge.svg)](https://github.com/Berlevog/yandex.middlefrontend.mario/actions/workflows/actions.yml)
[![Heroku](https://heroku-badge.herokuapp.com/?app=super-mario-yandex&style=flat)](https://super-mario-yandex.herokuapp.com/)

Запуск проекта - `npm start`

Сборка - `npm run build`

Тесты - `npm run test`

Demo - https://super-mario-yandex.herokuapp.com/

## Темизация

После запуска проекта в докере, в БД нужно внести две записи в таблицу theme:
name: light, theme: {}
name: dark, theme: {"palette": {"type": "dark", "primary": {"main": "#303030"}}}
