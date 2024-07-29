import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Profile } from "./profile.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ default: false })
  activo: boolean;

  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  @JoinColumn({ name: 'profile_id'})
  profile: Profile;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}