# REST-API-BANK Frontend (Vue 3 + Vuetify)

Фронтенд-приложение банковой системы **REST-API-BANK**, разработанное на **Vue 3** с использованием компонента **Vuetify 3**, **TypeScript** и архитектурного паттерна **Clean Architecture / DDD**.

---

## 🛠 Технологический стек

- **Core Framework:** [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **UI Library:** [Vuetify 3](https://vuetifyjs.com/) (Material Design 3)
- **State Management:** [Vuex 4](https://vuex.vuejs.org/) (Модульная архитектура + Plugins)
- **Routing:** [Vue Router 4](https://router.vuejs.org/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Utilities:** `jwt-decode`, `@mdi/font`
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** TypeScript

---

## ✨ Основные возможности

1. **Авторизация и управление сессиями:**
   - Вход (`Login`) и регистрация (`Sign up`) клиентов банка.
   - Безопасное хранение JWT-токена в `localStorage`.
   - Автоматическое восстановление пользовательской сессии и раскодирование токена при старте приложения.
   - Плагин авторизации (`authPlugin`), реактивно синхронизирующий Vuex-стор с локальным хранилищем.

2. **Банковские транзакции (CRUD):**
   - Просмотр списка транзакций в интерактивной таблице с пагинацией (`TransTable`).
   - Совершение транзакций (Пополнение, Снятие, Перевод).
   - Фильтрация транзакций по сумме, дате и другим параметрам.
   - Редактирование и удаление существующей транзакции через модальные окна (`TransDialog`).

3. **Обработка ошибок и пользовательский опыт (UX):**
   - Глобальные виджеты состояния: всплывающие диалоги ошибок (`ErrorDialog`) и индикаторы загрузки (`LoadingDialog`).
   - Автоматические редиректы между экранами авторизации (`/`) и транзакций (`/trans`).

---

## 📁 Структура проекта

Код структурирован с разделением ответственности по слоям (Domain, Infrastructure, Presentation, Store):

```text
src/
├── domain/                      # Доменная логика и правила валидации
│   ├── cust/                   # Бизнес-правила клиентов (валидация при регистрации)
│   └── trans/                  # Бизнес-правила транзакций
├── infrastructure/              # Инфраструктурный слой (API, HTTP, Storage)
│   ├── api/                    # Клиенты Axios и типы DTO
│   │   ├── cust/               # API авторизации клиентов (/customers/*)
│   │   ├── trans/              # API транзакций (/transactions/*)
│   │   └── error/              # Обработка API ошибок
│   └── storage/                # Работа с localStorage (токены)
├── store/                       # Хранилище Vuex 4
│   ├── modules/                # Модули состояния (cust, trans, modal, ui)
│   └── plugins/                # Плагины Vuex (authPlugin)
├── components/                  # UI-компоненты Vuetify
│   ├── widgets/                # Глобальные виджеты (ErrorDialog, LoadingDialog)
│   ├── AuthorDialog.vue        # Модальное окно авторизации
│   ├── TransDialog.vue         # Модальное окно транзакций
│   ├── TransTable.vue          # Таблица транзакций
│   └── NavBar.vue              # Шапка приложения
├── views/                       # Страницы (Views)
│   ├── AuthorPage.vue          # Главная страница входа / авторизации
│   └── TransPage.vue           # Страница управления транзакциями
├── router/                      # Конфигурация Vue Router
├── styles/                      # Настройки стилей и темы Vuetify
├── App.vue                      # Корневой компонент
└── main.ts                      # Точка входа в приложение
```

---

## 🚀 Быстрый старт

### Требования
- **Node.js** версии 18+
- **npm** версии 9+

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения
Создайте или отредактируйте файл `.env` в корне проекта:
```env
VITE_APP_API_URL=http://localhost:8000
```

### 3. Запуск в режиме разработки
```bash
npm run dev
```
Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Доступные скрипты

В [package.json](file:///d:/KA/tests/github/REST-API-BANK_frontend_vue/package.json) доступны следующие команды:

- **`npm run dev`** — Запуск локального сервера разработки (Vite).
- **`npm run type-check`** — Проверка типов TypeScript и Vue (через `vue-tsc`).
- **`npm run build`** — Проверка типов и сборка продакшен-бандла в директорию `dist`.
- **`npm run build-only`** — Сборка проекта без предварительной проверки типов.
- **`npm run preview`** — Локальный запуск и просмотр собранного продакшен-бандла.
- **`npm run lint`** — Проверка кода с помощью ESLint.
- **`npm run lint:fix`** — Автоматическое исправление ошибок линтера.
