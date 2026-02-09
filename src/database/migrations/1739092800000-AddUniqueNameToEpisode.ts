import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Example production migration: add UNIQUE constraint on episode.name.
 * Run with: npm run migration:run
 * Revert with: npm run migration:revert (if supported by your CLI).
 */
export class AddUniqueNameToEpisode1739092800000 implements MigrationInterface {
  name = 'AddUniqueNameToEpisode1739092800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add unique constraint on episode.name (fix duplicate names in DB before running)
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "UQ_episode_name" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "UQ_episode_name"`,
    );
  }
}
