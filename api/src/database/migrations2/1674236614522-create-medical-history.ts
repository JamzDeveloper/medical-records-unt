import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMedicalHistory1674236614522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`medical_history\`
        (
        \`id\` INT NOT NULL AUTO_INCREMENT, 
        \`code\` VARCHAR(45),
        \`family_history\` TEXT,
        \`diagnsed_diseases\` TEXT,
        \`created_at\`TIMESTAMP,
        \`updated_at\`TIMESTAMP,
        PRIMARY KEY(\`id\`)
        )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`medical_history\``);
  }
}
