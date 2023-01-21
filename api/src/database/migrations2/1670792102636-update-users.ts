import { MigrationInterface, QueryRunner } from "typeorm"

export class updateUsers1670792102636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`status\` ENUM('active','inactive') NOT NULL DEFAULT 'active'`)
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN   \`role\` ENUM('doctor','patient','super_admin') NOT NULL DEFAULT 'patient'`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`status\` ENUM('active','inactive')`)
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN   \`role\` ENUM('doctor','patient','super_admin')`)


    }

}
