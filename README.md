# GenDiff (Generate Difference)

[![Tests](https://github.com/neandreev/GenDiff/actions/workflows/jest.yml/badge.svg)](https://github.com/neandreev/GenDiff/actions/workflows/jest.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/621e8b02e6f615ce52e4/maintainability)](https://codeclimate.com/github/neandreev/GenDiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/621e8b02e6f615ce52e4/test_coverage)](https://codeclimate.com/github/neandreev/GenDiff/test_coverage)

## Что это

CLI-Утилита, позволяющая находить и выводить на экран различия между двумя конфигурационными файлами формата json, yml или ini

## Как это

- JS с минимумом библиотечных зависимостей
  - [lodash](https://github.com/lodash/lodash)
  - [Commander](https://github.com/tj/commander.js) (библиотека, упрощающая создание command-line интерфейсов приложений)
- Тесты: [Jest](https://github.com/facebook/jest)
- [Eslint](https://github.com/eslint/eslint)

## Как это работает

```sh
Установка: (внутри директории с исходным кодом)
   make install
   make publish
   make link

Удаление: (внутри директории с исходным кодом)
   make unlink

Использование:
   gendiff [options] <initialConfig> <modifiedConfig>

Доступные опции:
   --format, -f  -  формат вывода: pretty (по умолчанию), plain, json

Примеры:
   gendiff --format plain ./config1.json ./config2.json
   gendiff -f json config.ini anotherConfig.json
```

## Как это выглядит

<img src="https://neandreev.ru/images/Gendiff.gif" alt="Brain-games" width="600"/>
