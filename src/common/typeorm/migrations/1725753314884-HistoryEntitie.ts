import { MigrationInterface, QueryRunner } from 'typeorm';

export class HistoryEntitie1725753314884 implements MigrationInterface {
  name = 'HistoryEntitie1725753314884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "history" ("id" SMALLSERIAL NOT NULL, "investment" smallint NOT NULL, "valueWithdrawn" numeric(10,2) NOT NULL, "realValueWithdrawn" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL, "tax" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" ADD CONSTRAINT "FK_72a0f8f39d0cb667cd619f28ea4" FOREIGN KEY ("investment") REFERENCES "investment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_72a0f8f39d0cb667cd619f28ea4"`,
    );
    await queryRunner.query(`DROP TABLE "history"`);
  }
}
