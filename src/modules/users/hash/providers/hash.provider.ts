export interface HashProvider {
    encrypt(password: string): string;
    compare(password: string, hash: string): boolean;
}
