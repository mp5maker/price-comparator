import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1613143863760 implements MigrationInterface {
    name = 'initTables1613143863760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "distributor" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "branch" character varying DEFAULT null, CONSTRAINT "PK_949c7e62bf60d4e6488f6f29b8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_photo" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "encoding" character varying DEFAULT null, "mimetype" character varying DEFAULT null, "size" character varying DEFAULT null, "destination" character varying DEFAULT null, "filename" character varying DEFAULT null, "path" character varying DEFAULT null, "productId" integer, CONSTRAINT "PK_6c701613676cfa922e429eb1bae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_type" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying DEFAULT null, CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "model" character varying DEFAULT null, "price" double precision NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_distributors_distributor" ("productId" integer NOT NULL, "distributorId" integer NOT NULL, CONSTRAINT "PK_caa94832831e97d56a0a7b5b1f4" PRIMARY KEY ("productId", "distributorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8777098888ed9c5edac7877bf" ON "product_distributors_distributor" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_da07c867ad0177634f8fc6ce0f" ON "product_distributors_distributor" ("distributorId") `);
        await queryRunner.query(`CREATE TABLE "product_types_product_type" ("productId" integer NOT NULL, "productTypeId" integer NOT NULL, CONSTRAINT "PK_5dbc263ecc30c79e54e504f58ac" PRIMARY KEY ("productId", "productTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4b7d80f23240cdcc2256b7008" ON "product_types_product_type" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ec9265d0fb1539f72f43bfa017" ON "product_types_product_type" ("productTypeId") `);
        await queryRunner.query(`ALTER TABLE "product_photo" ADD CONSTRAINT "FK_e29118b4b3fb53584548fc80626" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_distributors_distributor" ADD CONSTRAINT "FK_f8777098888ed9c5edac7877bf1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_distributors_distributor" ADD CONSTRAINT "FK_da07c867ad0177634f8fc6ce0f0" FOREIGN KEY ("distributorId") REFERENCES "distributor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_types_product_type" ADD CONSTRAINT "FK_c4b7d80f23240cdcc2256b7008f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_types_product_type" ADD CONSTRAINT "FK_ec9265d0fb1539f72f43bfa0177" FOREIGN KEY ("productTypeId") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_types_product_type" DROP CONSTRAINT "FK_ec9265d0fb1539f72f43bfa0177"`);
        await queryRunner.query(`ALTER TABLE "product_types_product_type" DROP CONSTRAINT "FK_c4b7d80f23240cdcc2256b7008f"`);
        await queryRunner.query(`ALTER TABLE "product_distributors_distributor" DROP CONSTRAINT "FK_da07c867ad0177634f8fc6ce0f0"`);
        await queryRunner.query(`ALTER TABLE "product_distributors_distributor" DROP CONSTRAINT "FK_f8777098888ed9c5edac7877bf1"`);
        await queryRunner.query(`ALTER TABLE "product_photo" DROP CONSTRAINT "FK_e29118b4b3fb53584548fc80626"`);
        await queryRunner.query(`DROP INDEX "IDX_ec9265d0fb1539f72f43bfa017"`);
        await queryRunner.query(`DROP INDEX "IDX_c4b7d80f23240cdcc2256b7008"`);
        await queryRunner.query(`DROP TABLE "product_types_product_type"`);
        await queryRunner.query(`DROP INDEX "IDX_da07c867ad0177634f8fc6ce0f"`);
        await queryRunner.query(`DROP INDEX "IDX_f8777098888ed9c5edac7877bf"`);
        await queryRunner.query(`DROP TABLE "product_distributors_distributor"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_type"`);
        await queryRunner.query(`DROP TABLE "product_photo"`);
        await queryRunner.query(`DROP TABLE "distributor"`);
    }

}
