import { User } from "@src/modules/users/infra/orm/entities/user.entity";

export class ApiDTO {
    id?: string;
    title?: string;
    description?: string;
    github?: string;
    deploy_url?: string;
    type?: 'HTML' | 'MD';
    text_content?: string;
    user?: User;
}
