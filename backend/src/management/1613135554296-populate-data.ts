import { MigrationInterface, QueryRunner } from "typeorm";

export class populateData1613135554296 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "distributor"(name) VALUES('Electra')`
    );
    await queryRunner.query(
      `INSERT INTO "distributor"(name) VALUES('Transcom')`
    );
    await queryRunner.query(
      `INSERT INTO "distributor"(name) VALUES('Esquire')`
    );
    await queryRunner.query(
      `INSERT INTO "distributor"(name) VALUES('Butterfly')`
    );
    await queryRunner.query(
      `INSERT INTO "distributor"(name) VALUES('Best Electronics')`
    );
    await queryRunner.query(
      `INSERT INTO "distributor"(name) VALUES('MK Electronics')`
    );
    await queryRunner.query(
      `INSERT INTO "distributor"(name) VALUES('Rangs Electronics')`
    );

    await queryRunner.query(
      `INSERT INTO "product_type"(name) VALUES('Television')`
    );
    await queryRunner.query(
      `INSERT INTO "product_type"(name) VALUES('Washing Machine')`
    );
    await queryRunner.query(
      `INSERT INTO "product_type"(name) VALUES('Fridge')`
    );
    await queryRunner.query(
      `INSERT INTO "product_type"(name) VALUES('Air Conditioner')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
