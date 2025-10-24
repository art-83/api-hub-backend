import { User } from '@src/modules/users/infra/orm/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'apis' })
export class Api {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
title: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    github: string;

    @Column({ nullable: true })
    deploy_url: string;

    @Column({ nullable: true })
    type: 'HTML' | 'MD';

    @Column({ nullable: true })
    text_content: string;

    @ManyToOne(() => User, user => user.apis, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
