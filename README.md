# yandex.middlefrontend.mario

_Командный проект 5-9 спринта_

[![build-test](https://github.com/Berlevog/yandex.middlefrontend.mario/actions/workflows/actions.yml/badge.svg)](https://github.com/Berlevog/yandex.middlefrontend.mario/actions/workflows/actions.yml)

Запуск проекта:

`npm run docker:build`

`npm run docker:start`

После запуска узнать CONTAINER_ID контейнера mario_app:

`docker ps`
Засидировать БД:

`docker exec -it {CONTAINER_ID} npm run db:seed:undo`

`docker exec -it {CONTAINER_ID} npm run db:seed`

Demo - https://berlevog-mario-08.ya-praktikum.tech/app
