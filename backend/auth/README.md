# Database & migrations

Данный проект использует `TypeORM` для управления взаимодействия с базой данных. Помимо упрощения работы, это позволяет также формировать файлы миграций, позволяя применить существующие изменения к имеющейся БД.

Миграции можно применять для:

- **Development**: local PostgreSQL, а также PostgreSQL в Docker
- **Production**: Supabase PostgreSQL

## Стартовый workflow

```bash
cd backend/auth

# собираем проект в оптимизированную сборку
npm run build

# Применить миграцию (local/Docker/production)
npm run start

# Создаем первую/новую миграцию
npm run migration:create src/migrations/НазваниеМиграции
```

## Набор доступных команд

## Пример миграции

Когда мы выполним команды для первой миграции, сформируется пустая миграция, которую необходимо заполнить.

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUsers1768928636479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
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
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
```

См. подробную документацию: [MIGRATIONS.md](docs/MIGRATION.md)
