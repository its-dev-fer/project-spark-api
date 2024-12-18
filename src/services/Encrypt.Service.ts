import EncryptInterface from "../Interfaces/service/EncryptInterface";
import { SALT_ROUNDS } from "../Config/config";
import bcrypt from "bcrypt";

import {
    ErrorPasswordComparison,
    ErrorPasswordHashing
} from "../Errors/Response.Error";

export default class EncryptService implements EncryptInterface {
    async compare(
        hash_password: string,
        plain_password: string
    ): Promise<boolean> {
        try {
            return await bcrypt.compare(plain_password, hash_password);
        } catch (error) {
            throw new ErrorPasswordComparison("Password comparison failed");
        }
    }

    async hash(password: string): Promise<string> {
        try {
            const saltRounds = parseInt(SALT_ROUNDS);
            return await bcrypt.hash(password, saltRounds);
        } catch (error) {
            throw new ErrorPasswordHashing("Password hashing failed");
        }
    }
}
