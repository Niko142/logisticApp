import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUsers1768928636479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
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
