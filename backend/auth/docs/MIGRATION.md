# Migrations

## Список доступных команд

### `npm run migration:create`

Создает пустой файл миграции, который нужно заполнить вручную.

```bash
npm run migration:create src/migrations/CreateUserTable
```

### `npm run migration:generate`

Автоматически генерирует миграцию на основе изменений в entities.

```bash
# 1. Изменяем entity
# src/entities/User.entity.ts

# Например
@Column({ nullable: true })
phone: string;

# 2. Генерируем миграцию
npm run migration:generate src/migrations/AddPhoneToUser
```

TypeORM сравнит ваши entities с текущей схемой БД и создаст необходимые SQL команды.

### `npm run migration:run`

Применяет все ожидаемые (pending) миграции к базе данных.

```bash
npm run build

# Применение миграций
npm run migration:run
```

### `npm run migration:revert`

Откатывает последнюю примененную миграцию.

```bash
npm run migration:revert
```

## Создание миграций

### Способ 1: Вручную (для новых таблиц)

```bash
npm run migration:create src/migrations/CreateUserTable
```

Заполните созданный файл:

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1768928636479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`       CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) NOT NULL UNIQUE,
        "username" VARCHAR(25) NOT NULL UNIQUE,
        "password" VARCHAR(64) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_user_email"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
```

### Способ 2: Авто-генерация (для изменений существующих таблиц)

```bash
# 1. Обновляем entity

# 2. Генерируем миграцию

npm run migration:generate src/migrations/NameMigration

# 3. Проверяем созданный файл и корректируем
```

## Production деплой

### Автоматическое применение (Render)

Миграции применяются автоматически при каждом деплое:

```json
{
  "scripts": {
    "start": "npm run migration:run && node dist/index.js"
  }
}
```

Процесс деплоя:

- Render собирает проект (`npm run build`);
- Запускает `npm start`;
- Выполняются `pending` миграции;
- Запускается приложение
