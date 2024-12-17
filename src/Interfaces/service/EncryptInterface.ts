export default interface EncryptInterface {
    hash(password: string): Promise<string>;
    compare(hash_password: string, plain_password: string): Promise<boolean>;
}
