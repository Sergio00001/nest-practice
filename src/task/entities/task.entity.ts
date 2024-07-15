import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../database-postgres/entities/default.entity';

@Entity()
export class TaskEntity extends DefaultEntity {
  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar')
  description: string;

  @Column('boolean', { default: false })
  isCompleted: boolean;
}
