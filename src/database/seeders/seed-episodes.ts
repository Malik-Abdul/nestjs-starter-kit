import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Episode } from '../../episodes/entity/episode.entity';
import { faker } from '@faker-js/faker';

export async function seedEpisodes(app: INestApplication) {
  const dataSource = app.get(DataSource);
  const repo = dataSource.getRepository(Episode);

  const episodes = Array.from({ length: 10 }, () =>
    repo.create({
      name: faker.lorem.sentence(3),
      featured: faker.datatype.boolean(),
    }),
  );

  await repo.save(episodes);
  console.log(`Seeded ${episodes.length} episodes.`);
}
