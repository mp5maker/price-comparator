import {MigrationInterface, QueryRunner} from "typeorm";

export class initEntities1613133804175 implements MigrationInterface {
    name = 'initEntities1613133804175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "distributor" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "branch" character varying DEFAULT null, CONSTRAINT "PK_949c7e62bf60d4e6488f6f29b8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_photo" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "encoding" character varying DEFAULT null, "mimetype" character varying DEFAULT null, "size" character varying DEFAULT null, "destination" character varying DEFAULT null, "filename" character varying DEFAULT null, "path" character varying DEFAULT null, "productId" integer, CONSTRAINT "PK_6c701613676cfa922e429eb1bae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_type" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying DEFAULT null, CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "alias" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying DEFAULT null, "name" character varying DEFAULT null, "description" character varying DEFAULT null, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "model" character varying DEFAULT null, "price" double precision NOT NULL, "distributorId" integer, "typeId" integer, CONSTRAINT "REL_396d818ad5658698f4ca2e9523" UNIQUE ("distributorId"), CONSTRAINT "REL_53bafe3ecc25867776c07c9e66" UNIQUE ("typeId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_photo" ADD CONSTRAINT "FK_e29118b4b3fb53584548fc80626" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_396d818ad5658698f4ca2e95235" FOREIGN KEY ("distributorId") REFERENCES "distributor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_53bafe3ecc25867776c07c9e666" FOREIGN KEY ("typeId") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_53bafe3ecc25867776c07c9e666"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_396d818ad5658698f4ca2e95235"`);
        await queryRunner.query(`ALTER TABLE "product_photo" DROP CONSTRAINT "FK_e29118b4b3fb53584548fc80626"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_type"`);
        await queryRunner.query(`DROP TABLE "product_photo"`);
        await queryRunner.query(`DROP TABLE "distributor"`);
    }

}
