import { IsOptional, IsBoolean, IsString } from "class-validator";
export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}

export class UpdateEpisodeDto {
  id: string;
  name: string;
  featured?: boolean;
}
