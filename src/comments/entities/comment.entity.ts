import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category, (category) => category.comments, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'comment_category' })
  categories: Category[];
}
