import { Api } from '@src/modules/api/infra/orm/entities/api.entity';
import { Comments } from '@src/modules/comments/infra/orm/entities/comment.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    github: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Api, api => api.user)
    apis: Api[];

    @OneToMany(() => Comments, comment => comment.user)
    comments: Comments[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
