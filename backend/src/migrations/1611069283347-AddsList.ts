import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsList1611069283347 implements MigrationInterface {
    name = 'AddsList1611069283347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("name" character varying NOT NULL, CONSTRAINT "PK_22cc43e9a74d7498546e9a63e77" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "list_products_product" ("listId" integer NOT NULL, "productName" character varying NOT NULL, CONSTRAINT "PK_bc58610153edea2e9121af8b0b0" PRIMARY KEY ("listId", "productName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_180a4a8a20cb942b97de4b40e6" ON "list_products_product" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8def7f5c580b7234e05369f710" ON "list_products_product" ("productName") `);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_products_product" ADD CONSTRAINT "FK_180a4a8a20cb942b97de4b40e69" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_products_product" ADD CONSTRAINT "FK_8def7f5c580b7234e05369f710e" FOREIGN KEY ("productName") REFERENCES "product"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_products_product" DROP CONSTRAINT "FK_8def7f5c580b7234e05369f710e"`);
        await queryRunner.query(`ALTER TABLE "list_products_product" DROP CONSTRAINT "FK_180a4a8a20cb942b97de4b40e69"`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_46ded14b26382088c9f032f8953"`);
        await queryRunner.query(`DROP INDEX "IDX_8def7f5c580b7234e05369f710"`);
        await queryRunner.query(`DROP INDEX "IDX_180a4a8a20cb942b97de4b40e6"`);
        await queryRunner.query(`DROP TABLE "list_products_product"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
