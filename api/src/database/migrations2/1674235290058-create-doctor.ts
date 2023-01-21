import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDoctor1674235290058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`doctor\`(
           \`id\` INT NOT NULL ,
            \`user_id\` INT,
            \`created_at\` TIMESTAMP,
            \`updated_at\` TIMESTAMP,
            PRIMARY KEY(\`id\`,
            \`user_id\`)
            )
            `);
    await queryRunner.query(`ALTER TABLE \`doctor\` ADD CONSTRAINT \`fk_doctor_user_2\`
            FOREIGN KEY(\`user_id\`) REFERENCES \`user\`(\`id\`);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`doctor\` DROP FOREIGN KEY \`fk_doctor_user_  2\` `,
    );
    await queryRunner.query(`DROP TABLE \`doctor\``);
  }
}
