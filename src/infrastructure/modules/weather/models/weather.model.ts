import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { WeatherEntity } from 'domain/entities';
import { IsObject } from 'class-validator';

@Entity('weather')
@Unique(['lat', 'lon'])
export class WeatherModel implements WeatherEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column({ type: 'decimal', precision: 6, scale: 4 })
  lat: number;

  @Column({ type: 'decimal', precision: 7, scale: 4 })
  lon: number;

  @Column({ type: 'jsonb' })
  @IsObject()
  data: Record<string, any>;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;
}
