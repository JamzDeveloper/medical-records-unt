import { MigrationInterface, QueryRunner } from "typeorm"

export class updateDoctor1674299882953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`doctor\` DROP FOREIGN KEY \`fk_doctor_user_2\` `,
          );
          await queryRunner.query(`ALTER TABLE \`doctor\` ADD CONSTRAINT \`fk_doctor_user_3\`
          FOREIGN KEY(\`user_id\`) REFERENCES \`user\`(\`id\`);`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`doctor\` DROP FOREIGN KEY \`fk_doctor_user_3\` `,
          );
          await queryRunner.query(`ALTER TABLE \`doctor\` ADD CONSTRAINT \`fk_doctor_user_2\`
          FOREIGN KEY(\`user_id\`) REFERENCES \`user\`(\`id\`);`);
    }

}
