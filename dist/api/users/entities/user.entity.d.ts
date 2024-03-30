import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: string;
    username: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
