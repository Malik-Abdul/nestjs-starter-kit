import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPublishedAtToEpisode1770740027815 implements MigrationInterface {
    name = 'AddPublishedAtToEpisode1770740027815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Use DEFAULT so existing rows get a value (required for NOT NULL)
        await queryRunner.query(
            `ALTER TABLE "episode" ADD "published_at" TIMESTAMP NOT NULL DEFAULT NOW()`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "episode" DROP COLUMN "published_at"`);
    }

}
