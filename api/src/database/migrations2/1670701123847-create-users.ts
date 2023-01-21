import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1670701123847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user\`(
            \`id\` INT NOT NULL AUTO_INCREMENT,
            \`name\` VARCHAR(45) NOT NULL,
            \`last_name\` VARCHAR(45) NOT NULL,
            \`photo\` VARCHAR(45) DEFAULT NULL,
            \`email\` VARCHAR(45) ,
            \`username\` VARCHAR(45) NOT NULL UNIQUE,
            \`status\` ENUM('active','inactive'),
            \`password\` VARCHAR(200) NOT NULL,
            \`phone_number\` VARCHAR(15) ,
            \`role\` ENUM('doctor','patient','super_admin'),
            \`recovery_code\`VARCHAR(10) DEFAULT NULL,
            PRIMARY KEY(\`id\`)
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
