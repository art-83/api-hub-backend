import { User } from '@src/modules/users/infra/orm/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';

@Entity({ name: 'api_comments' })
export class ApiComment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.apiComments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => ApiComment, (comment) => comment.children, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parent_id' })
    parent: ApiComment;

    @OneToMany(() => ApiComment, (comment) => comment.parent)
    children: ApiComment[];

    @ManyToOne(() => Api, (api) => api.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'api_id' })
    api: Api;
}
