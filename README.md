# TasteEat - Сервис доставки еды

## Обзор проекта
TasteEat - это полнофункциональное веб-приложение для доставки еды, построенное на современных технологиях и контейнеризированное с помощью Docker. Приложение включает адаптивный React-фронтенд, Node.js бэкенд API и базу данных PostgreSQL.

## Технологический стек
- **Фронтенд**: React 18 + Vite
- **Бэкенд**: Node.js + Express + Sequelize ORM
- **База данных**: PostgreSQL 15
- **Контейнеризация**: Docker + Docker Compose
- **Веб-сервер**: Nginx
- **Окружение**: Alpine Linux

## Предварительные требования
- Docker Desktop 20.10+ или Docker Engine 24.0+
- Docker Compose 2.20+
- Git

## Структура проекта
TasteEat/
├── TasteEatBackend/ 
│ ├── config/ 
│ ├── controllers/ 
│ ├── models/ 
│ ├── routes/  
│ ├── server.js 
│ ├── package.json
│ └── Dockerfile 
├── TasteEatFrontend/ 
│ ├── src/ 
│ ├── public/ 
│ ├── dist/ 
│ ├── nginx.conf 
│ ├── package.json
│ └── Dockerfile
├── docker-compose.yml 
├── .env
├── dump.sql 
├── restore-db.bat 
└── README.md 

## Создание .env файла в корне проекта (пример ниже)
### Конфигурация базы данных
DB_NAME=TasteEat
DB_USER=postgres
DB_PASSWORD=your_secure_password_here
DB_HOST=postgres
DB_PORT=5432
NODE_ENV=production
PORT=3000
REACT_APP_API_URL=http://localhost:3000/api

## Быстрый старт
### Клонирование и настройка
git clone https://github.com/MaltSun/TasteEat.git
cd TasteEat

### Развертывание приложения
#### Сборка и запуск всех сервисов
docker-compose up -d --build
#### Или запуск без пересборки
docker-compose up -d
#### Или пошаговый запуск
docker-compose up -d postgres    
docker-compose up -d backend    
docker-compose up -d frontend   

### Проверка развертывания
#### Проверка статуса контейнеров
docker-compose ps
#### Мониторинг логов запуска
docker-compose logs -f
#### Тестирование здоровья бэкенда
curl http://localhost:3000/api/health
#### Тестирование здоровья бэкенда http://localhost

## Резервное копирование
### Создание резервной копии в SQL формате
docker-compose exec -T postgres pg_dump -U postgres -d TasteEat --format=plain > backup_$(date +%Y%m%d).sql
### Использование предоставленного скрипта (Windows)
.\restore-db.bat

## Устранение неисправностей
### Порт уже используется
### Решение
- Найти процесс, использующий порт (Windows): netstat -ano | findstr :80
- Завершить процесс: taskkill /PID <PID> /F
- Или изменить порт в docker-compose.yml:
ports:
  - "8080:80"
 
### Отказ подключения к базе данных
### Решение
- Проверить статус базы данных: docker-compose pss
- Если база данных не запущена: docker-compose up -d postgres
- Подождать, пока база данных станет здоровой: docker-compose ps
- Проверить подключение к базе данных: docker-compose exec postgres pg_isready -U postgres

### Отказ в разрешении в nginx
### Решение
- Остановить контейнер: docker-compose stop frontend
- Пересобрать образ: docker-compose up -d --build frontend
