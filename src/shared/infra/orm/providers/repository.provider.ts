export interface RepositoryProvider<T> {
    find(options: Partial<T>): Promise<T[]>;
    create(api: Partial<T>): Promise<T>;
    update(api: T): Promise<T>;
    delete(id: string): Promise<void>;
}
