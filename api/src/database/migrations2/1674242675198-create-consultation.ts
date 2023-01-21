import { MigrationInterface, QueryRunner } from 'typeorm';

export class createConsultation1674242675198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`consultation\`(
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`medical_history_id\` INT NOT NULL,
        \`doctor_id\` INT NOT NULL,
        \`description\` TEXT,
        PRIMARY KEY(\`id\`,\`medical_history_id\`,\`doctor_id\`)
        )`);
    await queryRunner.query(`ALTER TABLE \`consultation\`
         ADD CONSTRAINT \`fk_consultation_medical_history_id_1\`
        FOREIGN KEY(\`medical_history_id\`) REFERENCES \`medical_history\`(\`id\`);
    `);
    await queryRunner.query(`ALTER TABLE \`consultation\`
        ADD CONSTRAINT \`fk_consultation_doctor_id_1\`
            FOREIGN KEY(\`doctor_id\`) REFERENCES \`doctor\`(\`id\`);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE \`consultation\` DROP FOREIGN KEY \`fk_consultation_medical_history_id_1\` `,
      );
      await queryRunner.query(
        `ALTER TABLE \`consultation\` DROP FOREIGN KEY \`fk_consultation_doctor_id_1\` `,
      );
      await queryRunner.query(
        `DROP TABLE \`consultation\``
      )
  }
}
