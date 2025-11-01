# Опросник (React + Context + Router)

Одностраничное приложение-опросник. Общие шапка и навигация, контент — по маршрутам. Данные форм хранятся в React Context.

## Технологии

- React 18, TypeScript
- React Router v6
- React Context
- CRA (react-scripts)
- @testing-library для тестов

## Запуск

- Установить зависимости: `npm i`
- Dev-сервер: `npm start` (http://localhost:3000)
- Тесты: `npm test`
- Сборка: `npm run build`

## Структура

- `src/components/app/App.tsx` — инициализация роутера, загрузка данных, Layout
- `src/components/layout/` — разметка страницы и лоадер
- `src/components/header/` — заголовок
- `src/components/navigation/` — кнопки «Назад/Вперед»
- `src/components/content/` — экраны: главная, шаги, финал
- `src/components/form/` — общая форма, поля, тесты
- `src/context/form-data-context/` — контекст, типы и провайдер
- `src/api/` + `src/data.ts` — мок-данные шагов
- `src/const.ts` — список шагов и финальный маршрут

## Пользовательский сценарий

1. Главная (/) — ввод имени/email/занятий. Кнопка «Начать» активна, если заполнено хотя бы одно поле.
2. Шаги `/first`, `/second`, `/third` — на каждом «Сохранить», данные шага попадают в Context.
3. Финал `/finish` — «Отправить» выводит в консоль массив из 4 элементов `[name, data]`.

## Тесты формы

Файл: `src/components/form/__tests__/form.test.tsx`
- Тест 1 — рендер input и textarea (по data-testid)
- Тест 2 — рендер подписей
- Тест 3 — рендер кнопки из FooterComponent и её состояние `disabled`
- Тест 4 — корректность данных, переданных из формы в FooterComponent

## Типы/настройки

- TypeScript настроен через `tsconfig.json` (`isolatedModules`, типы jest/node)
- ESLint — конфиг CRA

## Замечания по стилю

В проекте есть базовая адаптивность. Визуальная тема — светлая, с ретро‑бумажной карточкой и тёплым акцентом у кнопок.

## Live

- Открыть сайт: https://sanyblagorodny.github.io/SF-JS-Modul-19.-React/

## CI/CD

![Deploy](https://github.com/SanyBlagorodny/SF-JS-Modul-19.-React/actions/workflows/deploy.yml/badge.svg)
