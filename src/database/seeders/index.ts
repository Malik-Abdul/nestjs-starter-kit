import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { seedEpisodes } from './seed-episodes';

async function run() {
  const app = await NestFactory.create(AppModule);

  await seedEpisodes(app);
  // Add more seeders here, e.g.:
  // await seedTopics(app);

  await app.close();
  console.log('All seeders completed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
