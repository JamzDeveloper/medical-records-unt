import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPatient1674237261585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        
    CREATE TABLE IF NOT EXISTS \`patient\`(
    \`id\` INT NOT NULL,
    \`user_id\` INT ,
    \`medical_history_id\` INT,
    \`dni\` VARCHAR(8) NOT NULL,
    \`date_birth\` DATE NOT NULL,
    \`created_at\` TIMESTAMP,
    \`updated_at\` TIMESTAMP,
    PRIMARY KEY (\`id\`,\`medical_history_id\`)
    )
    `);
    await queryRunner.query(`
    ALTER TABLE \`patient\` ADD CONSTRAINT \`fk_patient_medical_history_id_1\`
    FOREIGN KEY(\`medical_history_id\`) REFERENCES \`medical_history\`(\`id\`);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`fk_patient_medical_history_id_1\` `,
    );
    await queryRunner.query(`DROP TABLE \`patient\``);

  }
}
