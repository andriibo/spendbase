import { MigrationInterface, QueryRunner } from 'typeorm';

export class Weather1716994526237 implements MigrationInterface {
  name = 'Weather1716994526237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "weather" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lat" numeric(6,4) NOT NULL, "lon" numeric(7,4) NOT NULL, "data" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f27dbddfa174c5fca08f54aafdc" UNIQUE ("lat", "lon"), CONSTRAINT "PK_af9937471586e6798a5e4865f2d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "weather"`);
  }
}
