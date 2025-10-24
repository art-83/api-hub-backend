import { User } from "@src/modules/users/infra/orm/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'comments' })
export class Comments {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Comments, comment => comment.children, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parent_id' })
    parent: Comments;

    @OneToMany(() => Comments, comment => comment.parent)
    children: Comments[];
}