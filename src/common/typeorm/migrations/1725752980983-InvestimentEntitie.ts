import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvestimentEntitie1725752980983 implements MigrationInterface {
  name = 'InvestimentEntitie1725752980983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "investment" ("id" SMALLSERIAL NOT NULL, "user" smallint NOT NULL, "name" character varying(255) NOT NULL, "initialValue" numeric(10,2) NOT NULL, "expectedValue" numeric(10,2), "initialDate" TIMESTAMP NOT NULL, "status" character varying(32) NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ad085a94bd56e031136925f681b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment" ADD CONSTRAINT "FK_cf5858176dcecdd3ef35a52523a" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment" DROP CONSTRAINT "FK_cf5858176dcecdd3ef35a52523a"`,
    );
    await queryRunner.query(`DROP TABLE "investment"`);
  }
}
