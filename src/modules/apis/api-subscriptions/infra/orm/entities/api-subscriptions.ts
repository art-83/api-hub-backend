import { User } from '@src/modules/users/infra/orm/entities/user.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';

@Entity('api_subscriptions')
export class ApiSubscription {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Api)
    @JoinColumn({ name: 'api_id' })
    api: Api;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
