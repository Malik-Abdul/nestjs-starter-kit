import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  featured: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;  

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @IsDate()
  @Type(() => Date)
  @Column({ name: 'published_at', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;
}
