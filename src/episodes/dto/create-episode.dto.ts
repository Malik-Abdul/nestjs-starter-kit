export class CreateEpisodeDto {
  name: string;
  featured?: boolean;
}

export class UpdateEpisodeDto {
  id: string;
  name: string;
  featured?: boolean;
}
