import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ObjectIdColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { ObjectId } from "mongodb";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ default: false })
  activo: boolean;

  // @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  // @JoinColumn({ name: 'profile_id'})
  // profile: Profile;

  // @OneToMany(() => Comment, comment => comment.user)
  // comments: Comment[];
}