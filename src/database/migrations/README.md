# Migrations (production DB)

With `synchronize: false`, run migrations to change the schema.

## Commands

- **Run pending migrations:** `npm run migration:run`
- **Revert last migration:** `npm run migration:revert`
- **Generate migration from entity diff:** `npm run migration:generate -- src/database/migrations/YourMigrationName`

## Example: add a new column

Create a new file `src/database/migrations/<timestamp>-AddMyColumnToEpisode.ts`:

```ts
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMyColumnToEpisode1234567890123 implements MigrationInterface {
  name = 'AddMyColumnToEpisode1234567890123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'episode',
      new TableColumn({
        name: 'my_column',
        type: 'varchar',
        length: '255',
        isNullable: true,  // use false + default for required columns
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('episode', 'my_column');
  }
}
```

Then run `npm run migration:run`.
