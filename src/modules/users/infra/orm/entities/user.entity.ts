import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';
import { ApiComment } from '@src/modules/apis/api-comments/infra/orm/entities/api-comment.entity';
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

    @OneToMany(() => Api, (api) => api.user)
    apis: Api[];

    @OneToMany(() => ApiComment, (apiComment) => apiComment.user)
    apiComments: ApiComment[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
