import { User } from "@prisma/client";

export interface UserWithoutPassword extends User{
    password: undefined;
}