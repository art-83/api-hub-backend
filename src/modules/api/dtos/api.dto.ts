export class ApiDTO {
    id?: string;
    title?: string;
    description?: string;
    github?: string;
    deploy_url?: string;
    type?: 'HTML' | 'MD';
    text_content?: string;
}
